import {labelFromName} from 'bespin-ui/utils/string-formatting';
import { module, test } from 'qunit';

module('Unit | Utility | string formatting');

// Replace this with your real tests.
test('labelFromName will capitalizes one word', function(assert) {
  assert.equal(labelFromName('one'), 'One');
});

test('labelFromName will capitalizes two word titles', function(assert) {
  assert.equal(labelFromName('one two'), 'One Two');
  assert.equal(labelFromName('one_two'), 'One Two');
});

test('labelFromName will capitalizes three word titles', function(assert) {
  assert.equal(labelFromName('one two three'), 'One Two Three');
  assert.equal(labelFromName('one_two_three'), 'One Two Three');
});

test('labelFromName removes duplicate spaces', function(assert) {
  assert.equal(labelFromName('first  second'), 'First Second');
});


