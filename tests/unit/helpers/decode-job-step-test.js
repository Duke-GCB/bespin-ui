import { decodeJobStep } from 'bespin-ui/helpers/decode-job-step';
import { module, test } from 'qunit';

module('Unit | Helper | job step');

// Replace this with your real tests.
test('it decodes job steps', function(assert) {
  assert.expect(6);

  let v = decodeJobStep('V');
  assert.equal(v, "Create VM");

  let s = decodeJobStep('S');
  assert.equal(s, "Staging In");

  let r = decodeJobStep('R');
  assert.equal(r, "Running Workflow");

  let o = decodeJobStep('O');
  assert.equal(o, "Store Job Output");

  let t = decodeJobStep('T');
  assert.equal(t, "Terminate VM");

  let u = decodeJobStep('_unknown_');
  assert.equal(u, '_unknown_', 'it returns input for unknown steps');
});
