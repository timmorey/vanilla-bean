import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('article-editor', 'Integration | Component | article editor', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{article-editor}}`);
  assert.ok(this.$().text().trim());
});
