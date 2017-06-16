import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveAndCreateJob() {
      // Must save all the things that compose an answer set
      let answerSet = this.get('model');
      // To call save on the related model, we must resolve it as a promise
      answerSet.save().then(savedAnswerSet => {
        return savedAnswerSet.createJob();
      }).then(createdJob => {
        this.transitionToRoute('jobs.show', createdJob);
      });
    }
  }
});
