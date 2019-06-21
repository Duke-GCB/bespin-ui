import { all } from 'rsvp';
import Controller from '@ember/controller';
import { oneWay } from '@ember/object/computed';
import EmberObject from '@ember/object';

const AnswerFormFieldErrors = EmberObject.extend({
  errors: null,
  show: false,
  length: oneWay('errors.length'),
  init() {
    this._super(...arguments);
    this.set('errors', []);
  },
  setError(fieldName, message) {
    this.clearError(fieldName);
    this.get('errors').addObject({field: fieldName, message: message});
  },
  clearError(fieldName) {
    this.set('show', false);
    const error = this.get('errors').findBy('field', fieldName);
    this.get('errors').removeObject(error);
  },
});

export default Controller.extend({
  // answerFormFieldErrors is an object owned by the controller, but passed down to individual answer-form
  // components to report their field errors
  answerFormErrors: null,
  init() {
    this._super(...arguments);
    this.set('answerFormErrors', AnswerFormFieldErrors.create());
  },

  actions: {
    back() {
      let workflowVersionId = this.get('model.questionnaire.workflowVersion.id');
      this.transitionToRoute('jobs.new.select-questionnaire', workflowVersionId);
    },
    saveAndCreateJob() {
      // First check if there are any form field errors
      const fieldErrorLength = this.get('answerFormErrors.length');
      if(fieldErrorLength > 0) {
        this.set('answerFormErrors.show', true);
        // When errors, stop here and do not save anything
        return;
      } else {
        this.set('answerFormErrors.show', false);
      }

      // Must save all the things that compose an answer set
      let answerSet = this.get('model');
      // To call save on the related model, we must resolve it as a promise
      // Save the input files and stage groups
      answerSet.get('stageGroup').then(stageGroup => {
        return stageGroup.save();
      }).then((savedStageGroup) => {
        return all(
          // save the dds files
          savedStageGroup.get('ddsFiles').map(ddsFile => { return ddsFile.save(); })
        );
      }).then(() => {
        return answerSet.save();
      }).then(savedAnswerSet => {
        return savedAnswerSet.createJob();
      }).then(createdJob => {
        this.transitionToRoute('jobs.show', createdJob);
      });
    }
  }
});
