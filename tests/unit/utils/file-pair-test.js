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
  let pair = FilePair .create();
  pair.addFile('foo');
  assert.equal(pair.get('length'), 1);
  assert.notOk(pair.get('isFull'), 'pair should not be full');
  pair.addFile('bar');
  assert.ok(pair.get('isFull'));
});

test('it can remove files', function(assert) {
  let pair = FilePair .create();
  pair.addFile('foo');
  pair.addFile('bar');
  assert.ok(pair.get('isFull'));
  pair.removeFile('bar');
  assert.notOk(pair.get('isFull'));
});

test('it stops at 2', function(assert) {
  let pair = FilePair .create();
  pair.addFile('foo');
  pair.addFile('bar');
  assert.throws(function() {
    pair.addFile('baz');
  });
});
