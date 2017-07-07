
import { decodeJobState } from 'bespin-ui/helpers/decode-job-state';
import { module, test } from 'qunit';

module('Unit | Helper | decode job state');

test('it decodes job states', function(assert) {
  assert.expect(9);
  assert.equal(decodeJobState('N'), "New");
  assert.equal(decodeJobState('A'), "Authorized");
  assert.equal(decodeJobState('S'), "Starting");
  assert.equal(decodeJobState('R'), "Running");
  assert.equal(decodeJobState('F'), 'Finished');
  assert.equal(decodeJobState('E'), 'Error');
  assert.equal(decodeJobState('c'), 'Canceling');
  assert.equal(decodeJobState('C'), 'Canceled');
  assert.equal(decodeJobState('r'), 'Restarting');
  assert.equal(decodeJobState('_unknown_'), '_unknown_', 'it returns input for unknown states');
});
