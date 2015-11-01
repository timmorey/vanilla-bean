import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('article-viewer', 'Integration | Component | article viewer', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{article-viewer}}`);
  assert.notOk(this.$().text().trim());
});
