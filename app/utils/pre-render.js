
const preRenderFunctions = {
  processRecipeTag,
  processIngredientsTag,
  processIngredientTag,
  processInstructionsTag,
  processInstructionTag
};

function preRender(content) {
  let chunks = content.split(/(<[^>]*>)/);
  let coalescedChunks = [];
  let coalesceStart = -1;
  for (let i = 0; i < chunks.length; i++) {
    if (isTag(chunks[i]) && shouldPreRenderTag(chunks[i])) {
      if (coalesceStart >= 0) {
        coalescedChunks.push(chunks.slice(coalesceStart, i).join(''));
        coalesceStart = -1;
      }
      coalescedChunks.push(chunks[i]);
    } else {
      if (coalesceStart < 0) {
        coalesceStart = i;
      }
    }
  }

  if (coalesceStart >= 0) {
    coalescedChunks.push(chunks.slice(coalesceStart, chunks.length).join(''));
  }

  chunks = coalescedChunks;
  let output = '';

  for (let i = 0; i < chunks.length; i++) {
    if (isTag(chunks[i]) && shouldPreRenderTag(chunks[i])) {
      const j = findClosingTag(chunks, i);
      output += processTaggedContent(chunks.slice(i, j + 1));
      i = j;
    } else {
      output += processText(chunks[i]);
    }
  }

  return output;
}

function isTag(tag) {
  return /^<[^>]*>$/.test(tag);
}

function shouldPreRenderTag(tag) {
  const dasherizedFunctionName = `process-${tagName(tag)}-tag`;
  const camelCasedFunctionName = dasherizedFunctionName.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });

  return preRenderFunctions[camelCasedFunctionName] instanceof Function;
}

function isOpenTag(tag) {
  return isTag(tag) && !isClosingTag(tag) && !isSelfClosingTag(tag);
}

function isClosingTag(tag) {
  return /^<\/[^>]*>$/.test(tag);
}

function isSelfClosingTag(tag) {
  return /^<[^>]*\/>$/.test(tag);
}

function tagName(tag) {
  const chunks = tag.split(/<\/|<|\s+|\/>|>/);
  for (let i = 0; i < chunks.length; i++) {
    if (chunks[i].length) {
      return chunks[i];
    }
  }
}

function processText(text) {
  const chunks = text.split('\n\n');
  let output = '';

  for (let i = 0; i < chunks.length; i++) {
    if (chunks[i].trim()) {
      output += `<p>${chunks[i].trim()}</p>`;
    }
  }

  return output;
}

function processTaggedContent(chunks) {
  const dasherizedFunctionName = `process-${tagName(chunks[0])}-tag`;
  const camelCasedFunctionName = dasherizedFunctionName.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });

  return preRenderFunctions[camelCasedFunctionName](chunks);
}

function processRecipeTag(chunks) {
  let output = `<article class='recipe'>`;
  output += chunks.slice(1, chunks.length - 1).join('');
  output += `</article>`;
  return output;
}

function processIngredientsTag(chunks) {

}

function processIngredientTag(chunks) {

}

function processInstructionsTag(chunks) {

}

function processInstructionTag(chunks) {

}

function findClosingTag(chunks, startTagIndex) {
  startTagIndex = startTagIndex || 0;
  const startTag = chunks[startTagIndex];
  if (isTag(startTag) && !isClosingTag(startTag)) {
    const startTagName = tagName(startTag);
    if (isSelfClosingTag(startTag)) {
      return startTagIndex;
    } else {
      let ignoreCount = 0;
      for (let i = startTagIndex + 1; i < chunks.length; i++) {
        if (isTag(chunks[i]) && tagName(chunks[i]) === startTagName) {
          if (isOpenTag(chunks[i])) {
            ignoreCount += 1;
          } else if (isClosingTag(chunks[i])) {
            if (ignoreCount) {
              ignoreCount -= 1;
            } else {
              return i;
            }
          }
        }
      }
    }
  }
}

export default preRender;
export { preRender, isTag, isOpenTag, isClosingTag, isSelfClosingTag, tagName };