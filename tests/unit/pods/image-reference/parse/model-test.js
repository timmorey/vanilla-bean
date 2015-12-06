import { moduleForModel, test } from 'ember-qunit';

moduleForModel('image-reference/parse', 'Unit | Model | image reference/parse', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
