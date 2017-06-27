import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:jobs/new/build-answer-set', 'Unit | Controller | jobs/new/build answer set', {
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it creates job and transitions to show route', function(assert) {
  assert.expect(3);
  let done = assert.async();
  let saveCount = 0;
  const Saveable = Ember.Object.extend({
    save() {
      saveCount = saveCount + 1;
      return Ember.RSVP.resolve(this);
    }
  });

  const mockStageGroup = Saveable.create({
    ddsFiles: [
      Saveable.create({}),
      Saveable.create({}),
      Saveable.create({}),
    ]
  });
  const stageGroupPromise = Ember.RSVP.resolve(mockStageGroup);
  const mockAnswerSet = Saveable.create({
    stageGroup: stageGroupPromise,
    createJob() {
      return Ember.RSVP.resolve('job-id');
    }
  });
  let controller = this.subject({
    model: mockAnswerSet,
    transitionToRoute(routeName, object) {
      assert.equal(routeName, 'jobs.show');
      assert.equal(object, 'job-id');
      assert.equal(saveCount, 5); // stage group, answerSet, and 3 files
      done();
    }
  });
  controller.send('saveAndCreateJob');
});
