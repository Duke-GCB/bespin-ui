import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    Ember.Logger.log(Ember.inspect(params));
    return this.get('store')
      .findRecord('job-questionnaire', params.questionnaire_id, {include: 'questions'})
      .then((questionnaire) => {
        return this.get('store').createRecord('job-answer-set', {questionnaire: questionnaire});
    });
  }
});
