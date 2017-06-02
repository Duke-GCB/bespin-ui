import FilePair from 'bespin-ui/utils/file-pair';
import { module, test } from 'qunit';

module('Unit | Utility | file pair');

// Replace this with your real tests.
test('it creates an empty pair', function(assert) {
  let pair = FilePair .create();
  assert.ok(pair);
  assert.notOk(pair.get('isFull'), 'Empty pair should not be full');
});

test('it indicates when full', function(assert) {
  let pair = FilePair.create();
  pair.addFile('foo');
  assert.equal(pair.get('length'), 1);
  assert.notOk(pair.get('isFull'), 'pair should not be full');
  pair.addFile('bar');
  assert.ok(pair.get('isFull'));
});

test('it indicates when empty', function(assert) {
  let pair = FilePair.create();
  assert.ok(pair.get('isEmpty', 'pair should be empty initially'));
  pair.addFile('foo');
  assert.notOk(pair.get('isEmpty'), 'pair should not be empty');
});

test('it can remove files', function(assert) {
  let pair = FilePair.create();
  pair.addFile('foo');
  pair.addFile('bar');
  assert.ok(pair.get('isFull'));
  pair.removeAt(0);
  assert.notOk(pair.get('isFull'));
});

test('it stops at 2', function(assert) {
  let pair = FilePair.create();
  pair.addFile('foo');
  pair.addFile('bar');
  assert.throws(function() {
    pair.addFile('baz');
  });
});

test('it maps file1 and file2 properties', function(assert) {
  let pair = FilePair.create();
  assert.notOk(pair.get('file1'));
  assert.notOk(pair.get('file2'));
  pair.addFile('foo');
  assert.equal(pair.get('file1'), 'foo');
  assert.notOk(pair.get('file2'));
  pair.addFile('bar');
  assert.equal(pair.get('file1'), 'foo');
  assert.equal(pair.get('file2'), 'bar');
  pair.removeAt(0);
  assert.equal(pair.get('file1'), 'bar', 'removing 0th element should change value of file 1');
  assert.notOk(pair.get('file2'));
});
