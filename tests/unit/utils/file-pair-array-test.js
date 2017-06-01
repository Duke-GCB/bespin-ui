import FilePairArray from 'bespin-ui/utils/file-pair-array';
import { module, test } from 'qunit';

module('Unit | Utility | file pair array');

// Replace this with your real tests.
test('it can create an empty pair array', function(assert) {
  let pairs = FilePairArray.create();
  assert.ok(pairs);
});

test('it creates the initial pair', function(assert) {
  let pairs = FilePairArray.create();
  assert.equal(pairs.get('length'), 0);
  pairs.addFile('foo');
  assert.equal(pairs.get('length'), 1);
});

test('it overflows on a full pair', function (assert) {
  let pairs = FilePairArray.create();
  pairs.addFile('foo');
  pairs.addFile('bar');
  assert.equal(pairs.get('length'), 1);
  assert.ok(pairs.get('lastPair.isFull'));
  pairs.addFile('baz');
  assert.equal(pairs.get('length'), 2);
  assert.notOk(pairs.get('lastPair.isFull'));
});

test('it flattens all files', function(assert) {
  let pairs = FilePairArray.create();
  pairs.addFile('foo');
  pairs.addFile('bar');
  pairs.addFile('baz');
  let allFiles = pairs.get('allFiles');
  assert.equal(pairs.get('length'), 2);
  assert.equal(allFiles.get('length'), 3);
});
