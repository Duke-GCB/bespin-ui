import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['workflow_version_id', 'questionnaire_id'],
  workflow_version_id: null,
  questionnaire_id: null,

  actions: {
    workflowChanged(workflow) {
      if(workflow) {
        this.set('workflow_version_id', workflow.get('latestVersion').get('id'));
      }
    },
    questionnaireChanged(questionnaire) {
      if(questionnaire) {
        this.set('questionnaire_id', questionnaire.get('id'));
      }
    },
    questionAnswered(answer) {
      // answer is a job-answer and it has been saved, so we just add it to the list
      let answerSet = this.get('model');
      // Should this be an observer?
      answerSet.set('questionnaire', this.get('questionnaire'));
      answerSet.get('answers').pushObject(answer); // But what if it's already there?
    },
    save() {
      this.get('model').save().then(() => {
        this.set('errors', null);
      }).catch((reason) => {
        this.set('errors', reason);
      });
    }
  },

  workflowVersion: Ember.computed('workflow_version_id', function() {
    const workflow_version_id = this.get('workflow_version_id');
    if(workflow_version_id) {
      return this.get('store').findRecord('workflowVersion', workflow_version_id);
    }
  }),

  questionnaires: Ember.computed('workflow_version_id', function() {
    const workflow_version_id = this.get('workflow_version_id');
    if(workflow_version_id) {
      return this.get('store').query('job-questionnaire', {
        filter:
          {workflow_version_id: workflow_version_id}
      });
    } else {
      return null;
    }
  }),

  questionnaire: Ember.computed('questionnaire_id', function() {
    const questionnaire_id = this.get('questionnaire_id');
    if(questionnaire_id) {
      return this.get('store').findRecord('job-questionnaire', questionnaire_id);
    } else {
      return null;
    }
  }),

  // Read-only answers that are already determinedby the questionnaire
  questionnaireAnswers: Ember.computed('questionnaire_id', function() {
    const questionnaire_id = this.get('questionnaire_id');
    if(questionnaire_id) {
      return this.get('store').query('job-answer', {
        questionnaire: questionnaire_id
      });
    } else {
      return null;
    }
  }),

});
