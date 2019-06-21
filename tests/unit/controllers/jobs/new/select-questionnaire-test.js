import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | jobs/new/select-questionnaire', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:jobs/new/select-questionnaire');
    assert.ok(controller);
  });

  test('it handles back action', function(assert) {
    let controller = this.owner.factoryFor('controller:jobs/new/select-questionnaire').create({
      transitionToRoute(routeName) {
        assert.equal(routeName, 'jobs.new.select-workflow','back action should transition to select workflow');
      }
    });
    controller.send('back');
  });

  test('it handles next action', function(assert) {
    let controller = this.owner.factoryFor('controller:jobs/new/select-questionnaire').create({
      transitionToRoute(routeName, id) {
        assert.equal(routeName, 'jobs.new.build-answer-set','next action should transition to build answer set');
        assert.equal(id, 532, 'next action should extract questionnaire id');
      }
    });
    let questionnaire = EmberObject.create({id: 532});
    controller.send('next', questionnaire);
  });
});
