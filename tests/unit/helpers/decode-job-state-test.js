
import { decodeJobState } from 'bespin-ui/helpers/decode-job-state';
import { module, test } from 'qunit';

module('Unit | Helper | decode job state');

// Replace this with your real tests.
test('it decodes job states', function(assert) {
  assert.expect(6);

  let r = decodeJobState('R');
  assert.equal(r, "Running");

  let n = decodeJobState('N');
  assert.equal(n, "New");

  let f = decodeJobState('F');
  assert.equal(f, 'Finished');

  let e = decodeJobState('E');
  assert.equal(e, 'Error');

  let c = decodeJobState('C');
  assert.equal(c, 'Canceled');

  let u = decodeJobState('_unknown_');
  assert.equal(u, '_unknown_', 'it returns input for unknown steps');
});
