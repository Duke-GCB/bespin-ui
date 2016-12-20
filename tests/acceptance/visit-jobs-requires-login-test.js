import { test } from 'qunit';
import moduleForAcceptance from 'bespin-ui/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | visit jobs requires login');

test('visiting /jobs requires login', function(assert) {
  visit('/jobs');
  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});
