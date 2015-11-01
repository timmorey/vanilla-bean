import { preRender, isTag, isOpenTag, isClosingTag, isSelfClosingTag, tagName } from '../../../utils/pre-render';
import { module, test } from 'qunit';

module('Unit | Utility | pre render');

// Replace this with your real tests.
test('it works', function(assert) {
  var result = preRender('x');
  assert.ok(result);
});

test('isTag works', function(assert) {
  assert.ok(isTag('<tag>'));
  assert.ok(isTag('<tag attribute="value">'));
  assert.ok(isTag('</closeTag>'));
  assert.ok(isTag('<selfClosingTag />'));
  assert.notOk(isTag('not a tag'));
});

test('isOpenTag works', function(assert) {
  assert.ok(isOpenTag('<tag>'));
  assert.ok(isOpenTag('<tag attribute="value">'));
  assert.notOk(isOpenTag('</closeTag>'));
  assert.notOk(isOpenTag('<selfClosingTag />'));
  assert.notOk(isOpenTag('not a tag'));
});

test('isClosingTag works', function(assert) {
  assert.ok(isClosingTag('</closeTag>'));
  assert.notOk(isClosingTag('<tag>'));
  assert.notOk(isClosingTag('<tag attribute="value">'));
  assert.notOk(isClosingTag('<selfClosingTag />'));
  assert.notOk(isClosingTag('not a tag'));
});

test('isSelfClosingTag works', function(assert) {
  assert.ok(isSelfClosingTag('<selfClosingTag />'));
  assert.ok(isSelfClosingTag('<selfClosingTag attribute="value" />'));
  assert.notOk(isSelfClosingTag('</closeTag>'));
  assert.notOk(isSelfClosingTag('<tag>'));
  assert.notOk(isSelfClosingTag('<tag attribute="value">'));
  assert.notOk(isSelfClosingTag('not a tag'));
});

test('tagName works', function(assert) {
  assert.equal(tagName('<tag>'), 'tag');
  assert.equal(tagName('<tag attribute="value">'), 'tag');
  assert.equal(tagName('<tag/>'), 'tag');
  assert.equal(tagName('</tag>'), 'tag');
});
