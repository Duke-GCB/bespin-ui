import { decodeJobStep } from 'bespin-ui/helpers/decode-job-step';
import { module, test } from 'qunit';

module('Unit | Helper | job step');

test('it decodes job steps', function(assert) {
  assert.expect(6);
  assert.equal(decodeJobStep('V'), "Create VM");
  assert.equal(decodeJobStep('S'), "Staging In");
  assert.equal(decodeJobStep('R'), "Running Workflow");
  assert.equal(decodeJobStep('O'), "Store Job Output");
  assert.equal(decodeJobStep('T'), "Terminate VM");
  assert.equal(decodeJobStep('_unknown_'), '_unknown_', 'it returns input for unknown steps');
});
