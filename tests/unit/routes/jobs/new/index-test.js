import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | jobs/new/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:jobs/new/index');
    assert.ok(route);
  });

  test('it transitions to workflow selection', function(assert) {
    let route = this.owner.factoryFor('route:jobs/new/index').create({
      transitionTo(routeName) {
        assert.equal('jobs.new.select-workflow', routeName);
      }
    });
    route.beforeModel();
  });
});
