import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:jobs/new/select-workflow-version', 'Unit | Controller | jobs/new/select workflow version', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it handles back action', function(assert) {
  let controller = this.subject({
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
  let controller = this.subject({
    workflowVersion: workflowVersion,
    transitionToRoute(routeName, id) {
      assert.equal(routeName, 'jobs.new.select-questionnaire', 'next action should transition to questionnaire selection');
      assert.equal(id, '2', 'next action should extract workflow version id');
    }
  });
  controller.send('next');
});
