import versionSort from 'bespin-ui/utils/version-sort';
import { module, test } from 'qunit';

module('Unit | Utility | version sort');

test('it sorts simple, single-digit versions', function(assert) {
  const unsorted = ['2','4','5','1','3'];
  let sorted = versionSort(unsorted);
  assert.deepEqual(sorted, ['1','2','3','4','5']);
});

test('it sorts semantic versions with differing numbers of components', function(assert) {
  const unsorted = ['3.0.0','2.2','1.0','2.1.1','2'];
  let sorted = versionSort(unsorted);
  assert.deepEqual(sorted, ['1.0','2','2.1.1','2.2', '3.0.0']);
});

test('it sorts versions with extra non-numeric characters', function(assert) {
  const unsorted = ['1','2.2.2-dev','1.3.1','5'];
  let sorted = versionSort(unsorted);
  assert.deepEqual(sorted, ['1','1.3.1','2.2.2-dev','5']);
});
