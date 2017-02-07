import Ember from 'ember';


export default Ember.Controller.extend({
  questionnaireService: Ember.inject.service('questionnaire'),
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
      const questionnaireProxy = this.get('questionnaireProxy');
      questionnaireProxy.save().then(() => {
        this.set('errors', null);
        this.transitionToRoute('jobs');
      }).catch((reason) => {
        this.set('errors', reason);
      });
    },
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

  questionnaireProxy: Ember.computed('questionnaire', function() {
    const questionnaire = this.get('questionnaire');
    const questionnaireService = this.get('questionnaireService');
    if(questionnaire) {
      // By making this a computed property, we effectively make it lazily loaded based on the questionnaire
      let proxy = questionnaireService.makeProxy(questionnaire);
      // The load() function returns a promise (for easier testing), but we don't observe it here directly
      proxy.load();
      // Instead we return the built proxy, and let its promises resolve in the background
      return proxy;
    } else {
      return null;
    }
  })
});
