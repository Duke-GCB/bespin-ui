import versionSort from 'bespin-ui/utils/version-sort';
import { makeSortKey } from 'bespin-ui/utils/version-sort';
import { module, test } from 'qunit';

module('Unit | Utility | version sort');

test('it makes sortKeys from versions by splitting on . or - and padding with zeroes', function(assert) {
  assert.equal(makeSortKey('1.2.3'), '000000000100000000020000000003');
  assert.equal(makeSortKey('1'), '0000000001');
  assert.equal(makeSortKey('1.0'), '00000000010000000000');
  assert.equal(makeSortKey('4.987654321'), '00000000040987654321');
  assert.equal(makeSortKey('1.2-dev'), '000000000100000000020000000dev');
  assert.equal(makeSortKey('1.0.5-alpha'), '00000000010000000000000000000500000alpha');
});

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
