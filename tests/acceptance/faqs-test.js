import { test } from 'qunit';
import moduleForAcceptance from 'bespin-ui/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | faqs');

test('visiting /faqs requires no login', function(assert) {
  visit('/faqs');
  andThen(function() {
    assert.equal(currentURL(), '/faqs');
    assert.equal(find('h2:first').text(), 'Bespin: Frequently Asked Questions');
  });
});
