import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    back() {
      this.transitionToRoute('jobs.new.select-workflow');
    },
    next(questionnaire) {
      this.transitionToRoute('jobs.new.build-answer-set', questionnaire.get('id'));
    },
  },
});
