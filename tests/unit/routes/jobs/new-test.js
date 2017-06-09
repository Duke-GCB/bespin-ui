import { moduleFor, test } from 'ember-qunit';

moduleFor('route:jobs/new', 'Unit | Route | jobs/new', {
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
