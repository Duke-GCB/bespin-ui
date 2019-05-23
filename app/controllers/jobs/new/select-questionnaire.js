import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    back() {
      this.transitionToRoute('jobs.new.select-workflow');
    },
    next(questionnaire) {
      this.transitionToRoute('jobs.new.build-answer-set', questionnaire.get('id'));
    },
  },
});
