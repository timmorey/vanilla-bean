import Ember from 'ember';

const {
  Logger: {
    assert
  }
} = Ember;

export default preRender;
export { preRender, isTag, isOpenTag, isClosingTag, isSelfClosingTag, tagName };

function preRender(content) {
  const tokenizer = new ArticleTokenizer(content);
  let chunk = null;
  let output = '';
  while (chunk = tokenizer.next()) {
    if (isTag(chunk)) {
      output += processTaggedContent(chunk, tokenizer);
    } else {
      output += processText(chunk);
    }
  }
  return output;
}

function isTag(tag) {
  return /^<[^>]*>$/.test(tag.trim());
}

function isOpenTag(tag) {
  return isTag(tag) && !isClosingTag(tag) && !isSelfClosingTag(tag);
}

function isClosingTag(tag) {
  return /^<\/[^>]*>$/.test(tag.trim());
}

function isSelfClosingTag(tag) {
  return /^<[^>]*\/>$/.test(tag.trim());
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
  const chunks = text.split('\n');
  let output = '';

  for (let i = 0; i < chunks.length; i++) {
    if (chunks[i].trim()) {
      if (isTag(chunks[i])) {
        output += chunks[i].trim();
      } else {
        output += `<p class='plain-text'>${chunks[i].trim()}</p>`;
      }
    }
  }

  return output;
}

function processTaggedContent(openTag, tokenizer) {
  switch (tagName(openTag)) {
    case 'recipe':
      return processRecipeTag(openTag, tokenizer);
    default:
      if (isSelfClosingTag(openTag)) {
        return openTag;
      } else if (isClosingTag(openTag)) {
        return '';
      } else {
        let chunk = null;
        let output = openTag;
        while (chunk = tokenizer.next()) {
          if (isTag(chunk)) {
            if (tagName(chunk) === tagName(openTag) && isClosingTag(chunk)) {
              output += chunk;
              return output;
            } else {
              output += processTaggedContent(chunk, tokenizer);
            }
          } else {
            output += processText(chunk);
          }
        }
      }
  }
}

function processRecipeTag(startTag, tokenizer) {
  const recipe = new Recipe();
  recipe.parse(startTag, tokenizer);
  return recipe.toHtml();
}

class ArticleTokenizer {

  constructor(content) {
    this._chunks = this._chunkify(content, [
      'recipe',
      'title',
      'attribution',
      'ingredients',
      'ingredient',
      'instructions',
      'instruction',
    ]);
  }

  next() {
    this._position = this._position || 0;
    return this._chunks[this._position++];
  }

  _chunkify(content, activeTags) {
    let chunks = content.split(/(<[^>]*>)/);
    let coalescedChunks = [];
    let coalesceStart = -1;
    for (let i = 0; i < chunks.length; i++) {
      if (isTag(chunks[i]) && activeTags.includes(tagName(chunks[i]))) {
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

    return coalescedChunks;
  }

}

class Recipe {

  parse(startTag, tokenizer) {
    this.title = '';
    this.attribution = '';
    this.ingredients = [];
    this.instructions = [];
    for (let chunk = tokenizer.next(); chunk && !(tagName(chunk) === 'recipe' && isClosingTag(chunk)); chunk = tokenizer.next()) {
      if (isTag(chunk)) {
        switch(tagName(chunk)) {
          case 'title':
            this._parseTitle(chunk, tokenizer); break;
          case 'attribution':
            this._parseAttribution(chunk, tokenizer); break;
          case 'ingredient':
            this._parseIngredient(chunk, tokenizer); break;
          case 'instruction':
            this._parseInstruction(chunk, tokenizer); break;
        }
      }
    }
  }

  _parseTitle(chunk, tokenizer) {
    this.title = tokenizer.next();
    const closingTag = tokenizer.next();
    assert(isClosingTag(closingTag) && tagName(closingTag) === 'title');
  }

  _parseAttribution(chunk, tokenizer) {
    this.attribution = tokenizer.next();
    const closingTag = tokenizer.next();
    assert(isClosingTag(closingTag) && tagName(closingTag) === 'attribution');
  }

  _parseIngredient(chunk, tokenizer) {
    this.ingredients.push(tokenizer.next());
    const closingTag = tokenizer.next();
    assert(isClosingTag(closingTag) && tagName(closingTag) === 'ingredient');
  }

  _parseInstruction(chunk, tokenizer) {
    this.instructions.push(tokenizer.next());
    const closingTag = tokenizer.next();
    assert(isClosingTag(closingTag) && tagName(closingTag) === 'instruction');
  }

  toHtml() {
    let output = `<article class='recipe'>`;

    output += `<header>`;
    output += this.title ? `<h1>${this.title}</h1>` : '';
    output += this.attribution ? `<p class='attribution'>${this.attribution}</p>` : '';
    output += `</header>`;

    output += `<section class='ingredients'>`;
    output += `<h2>Ingredients</h2>`;
    output += `<ul class='ingredients-list'>`;
    output += this.ingredients.map(ingredient => this._ingredientHtml(ingredient)).join('');
    output += `</ul>`;
    output += `</section>`;

    output += `<section class='instructions'>`;
    output += `<h2>Instructions</h2>`;
    output += `<ul class='instructions-list'>`;
    output += this.instructions.map(instruction => this._instructionHtml(instruction)).join('');
    output += `</ul>`;
    output += `</section>`;

    output += `</article>`;
    return output;
  }

  _ingredientHtml(ingredient) {
    return `<li class='ingredient'>${ingredient}</li>`;
  }

  _instructionHtml(instruction) {
    return `<li class='instruction'>${instruction}</li>`;
  }

}