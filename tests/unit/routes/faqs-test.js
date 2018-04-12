import { moduleFor, test } from 'ember-qunit';

moduleFor('route:faqs', 'Unit | Route | faqs', {
  needs: ['service:session']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
