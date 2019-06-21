import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('unit | controller | jobs/new/select workflow', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:jobs/new/select-workflow');
    assert.ok(controller);
  });

  test('it handles back action', function(assert) {
    let controller = this.owner.factoryFor('controller:jobs/new/select-workflow').create({
      transitionToRoute(routeName) {
        assert.equal(routeName, 'jobs','back action should transition to jobs');
      }
    });
    controller.send('back');
  });

  test('it handles next action', function(assert) {
    let workflow = EmberObject.create({ latestVersion: { id: 3 } });
    let controller = this.owner.factoryFor('controller:jobs/new/select-workflow').create({
      workflow: workflow,
      transitionToRoute(routeName, id) {
        assert.equal(routeName, 'jobs.new.select-questionnaire','next action should transition to questionnaire selection');
        assert.equal(id, 3, 'next action should extract workflow version from workflow');
      }
    });
    controller.send('next');
  });
});
