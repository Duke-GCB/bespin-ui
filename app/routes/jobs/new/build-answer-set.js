import Ember from 'ember';

export default Ember.Route.extend({
  // Create an answer set and a job file questionnaire
  model(params) {
    const store = this.get('store');
    let promises = {
      questionnaire: store.findRecord('job-questionnaire', params.questionnaire_id, {include: 'questions'}),
      // Persists a stage group
      stageGroup: store.createRecord('job-file-stage-group', {}) /* .save().then(stageGroup => { return stageGroup; }) */
    };
    return Ember.RSVP.hash(promises).then(hash => {
      return store.createRecord('job-answer-set', {
        jobName: 'FIXME',
        questionnaire: hash.questionnaire,
        stageGroup: hash.stageGroup
      });
    });
  }
});
