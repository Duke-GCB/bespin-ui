import versionSort from 'bespin-ui/utils/version-sort';
import { module, test } from 'qunit';

module('Unit | Utility | version sort');

// Replace this with your real tests.
test('it sorts version strings', function(assert) {
  const unsorted = ['3.0','1.0','2.1.1','2.0'];
  let sorted = versionSort(unsorted);
  assert.equal(sorted, ['1.0','2.0','2.1.1','3.0']);
});
