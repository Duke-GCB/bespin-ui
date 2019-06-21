import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | jobs/new/select workflow version', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:jobs/new/select-workflow-version');
    assert.ok(controller);
  });

  test('it handles back action', function(assert) {
    let controller = this.owner.factoryFor('controller:jobs/new/select-workflow-version').create({
      transitionToRoute(routeName) {
        assert.equal(routeName, 'jobs.new.select-workflow','back action should transition to select-workflow');
      }
    });
    controller.send('back');
  });

  test('it handles next action', function(assert) {
    const workflowVersion = {
      id: '2',
    };
    let controller = this.owner.factoryFor('controller:jobs/new/select-workflow-version').create({
      workflowVersion: workflowVersion,
      transitionToRoute(routeName, id) {
        assert.equal(routeName, 'jobs.new.select-questionnaire', 'next action should transition to questionnaire selection');
        assert.equal(id, '2', 'next action should extract workflow version id');
      }
    });
    controller.send('next');
  });
});
