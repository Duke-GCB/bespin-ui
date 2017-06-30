import { moduleFor, test } from 'ember-qunit';

moduleFor('route:workflow-versions', 'Unit | Route | workflow versions', {
  needs: ['service:session']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
