import EmberObject from '@ember/object';
import DisplayFieldLabelMixin from 'bespin-ui/mixins/display-field-label-mixin';
import { module, test } from 'qunit';
module('Unit | Mixin | display field label mixin');
// Replace this with your real tests.
test('displayLabel will capitalize one word displayName', function(assert) {
  const obj = EmberObject.extend(DisplayFieldLabelMixin, {}).create({
    fieldName: 'one'
  });
  assert.equal(obj.get('displayLabel'), 'One');
});
test('displayLabel will capitalizes two word displayName', function(assert) {
  const obj = EmberObject.extend(DisplayFieldLabelMixin, {}).create({
    fieldName: 'one two'
  });
  assert.equal(obj.get('displayLabel'), 'One Two');
});
test('displayLabel will capitalizes two underscored-word displayName', function(assert) {
  const obj = EmberObject.extend(DisplayFieldLabelMixin, {}).create({
    fieldName: 'one_two'
  });
  assert.equal(obj.get('displayLabel'), 'One Two');
});
test('labelFromName will capitalizes three word titles', function(assert) {
  const obj = EmberObject.extend(DisplayFieldLabelMixin, {}).create({
    fieldName: 'one two three'
  });
  assert.equal(obj.get('displayLabel'), 'One Two Three');
});
test('labelFromName removes duplicate spaces', function(assert) {
  const obj = EmberObject.extend(DisplayFieldLabelMixin, {}).create({
    fieldName: 'first  second'
  });
  assert.equal(obj.get('displayLabel'), 'First Second');
});
test('labelFromName uses fieldLabel instead of fieldName when present ', function(assert) {
  const obj = EmberObject.extend(DisplayFieldLabelMixin, {}).create({
    fieldName: 'first  second',
    fieldLabel: 'My label'
  });
  assert.equal(obj.get('displayLabel'), 'My label');
});
