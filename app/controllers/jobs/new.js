import Ember from 'ember';
import QuestionnaireUtil from '../../utils/questionnaire-util';

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
    save() {
      const questionnaire = this.get('questionnaire');
      const answerSet = this.get('model');
      answerSet.set('questionnaire', questionnaire);
      answerSet.save().then(() => {
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
      return this.get('store').findRecord('job-questionnaire', questionnaire_id, {include: 'questions'});
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

  questionnaireUtil: Ember.computed('store', 'questionnaire', function() {
    const questionnaire = this.get('questionnaire');
    const store = this.get('store');
    if(questionnaire) {
      return QuestionnaireUtil.create({store: store, questionnaire: questionnaire});
    }
  })
});
