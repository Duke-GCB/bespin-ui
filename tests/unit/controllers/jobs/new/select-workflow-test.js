import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:jobs/new/select-workflow', 'unit | controller | jobs/new/select workflow', {
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it handles back action', function(assert) {
  let controller = this.subject({
    transitionToRoute(routeName) {
      assert.equal(routeName, 'jobs','back action should transition to jobs');
    }
  });
  controller.send('back');
});

test('it handles next action', function(assert) {
  let controller = this.subject({
    transitionToRoute(routeName, id) {
      assert.equal(routeName, 'jobs.new.select-questionnaire','next action should transition to questionnaire selection');
      assert.equal(id, 3, 'next action should extract workflow version from workflow');
    }
  });
  let workflow = Ember.Object.create({ latestVersion: { id: 3 } });
  controller.send('next', workflow);
});
