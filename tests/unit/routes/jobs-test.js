import { moduleFor, test } from 'ember-qunit';

moduleFor('route:jobs', 'Unit | Route | jobs', {
  needs: ['service:session']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
