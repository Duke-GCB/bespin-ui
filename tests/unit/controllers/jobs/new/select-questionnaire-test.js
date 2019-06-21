import EmberObject from '@ember/object';
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:jobs/new/select-questionnaire', 'Unit | Controller | jobs/new/select-questionnaire', {
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it handles back action', function(assert) {
  let controller = this.subject({
    transitionToRoute(routeName) {
      assert.equal(routeName, 'jobs.new.select-workflow','back action should transition to select workflow');
    }
  });
  controller.send('back');
});

test('it handles next action', function(assert) {
  let controller = this.subject({
    transitionToRoute(routeName, id) {
      assert.equal(routeName, 'jobs.new.build-answer-set','next action should transition to build answer set');
      assert.equal(id, 532, 'next action should extract questionnaire id');
    }
  });
  let questionnaire = EmberObject.create({id: 532});
  controller.send('next', questionnaire);
});
