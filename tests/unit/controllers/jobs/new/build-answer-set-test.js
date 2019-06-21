import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:jobs/new/build-answer-set', 'Unit | Controller | jobs/new/build answer set', {
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it handles back action', function(assert) {
  let controller = this.subject({
    model: EmberObject.create({
      questionnaire: {
        workflowVersion: {
          id: 7
        }
      }
  }),
    transitionToRoute(routeName, workflowVersionId) {
      assert.equal(routeName, 'jobs.new.select-questionnaire','back action should transition to select-questionnaire');
      assert.equal(workflowVersionId, 7, 'back actoun should preserve workflow version');
    }
  });
  controller.send('back');
});

test('it creates job and transitions to show route', function(assert) {
  assert.expect(3);
  let done = assert.async();
  let saveCount = 0;
  const Saveable = EmberObject.extend({
    save() {
      saveCount = saveCount + 1;
      return resolve(this);
    }
  });

  const mockStageGroup = Saveable.create({
    ddsFiles: [
      Saveable.create({}),
      Saveable.create({}),
      Saveable.create({}),
    ]
  });
  const stageGroupPromise = resolve(mockStageGroup);
  const mockAnswerSet = Saveable.create({
    stageGroup: stageGroupPromise,
    createJob() {
      return resolve('job-id');
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
