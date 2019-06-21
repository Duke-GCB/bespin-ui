import ComponentSettings from 'bespin-ui/utils/component-settings';
import { module, test } from 'qunit';

module('Unit | Utility | component settings', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    assert.ok(ComponentSettings);
  });

  function findForCWLType(ary, cwlType) {
    for (var i = 0; i < ary.length; i++) {
      const item = ary[i];
      if (item['cwlType']  == cwlType) {
        return item;
      }
    }
    return null;
  }

  test('it maps int to int-field', function(assert) {
    assert.equal(findForCWLType(ComponentSettings, 'int')['name'], 'int-field');
  });

  test('it maps File to file-field', function(assert) {
    assert.equal(findForCWLType(ComponentSettings, 'File')['name'], 'file-field');
  });
});
