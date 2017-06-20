import { moduleFor, test } from 'ember-qunit';

moduleFor('route:jobs/new/index', 'Unit | Route | jobs/new/index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it transitions to workflow selection', function(assert) {
  let route = this.subject({
    transitionTo(routeName) {
      assert.equal('jobs.new.select-workflow', routeName);
    }
  });
  route.beforeModel();
});
