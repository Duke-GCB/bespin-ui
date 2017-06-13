import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    const store = this.get('store');
    return store
      .findRecord('job-questionnaire', params.questionnaire_id, {include: 'questions'})
      .then((questionnaire) => {
        return store.createRecord('job-answer-set', {
          questionnaire: questionnaire,
          stageGroup: store.createRecord('job-file-stage-group')
        });
    });
  }
});
