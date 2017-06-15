import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveAndCreateJob() {
      // Must save all the things that compose an answer set
      let answerSet = this.get('model');
      // To call save on the related model, we must resolve it as a promise
      answerSet.get('stageGroup').then(stageGroup => {
        return stageGroup.save();
      }).then(savedStageGroup => {
        // save the input files
        // TODO: THIS IS NOT WORKING.
        return Ember.RSVP.all(savedStageGroup.get('ddsFiles').invoke('save'));
        // TODO: save the URL files
      }).then(savedDdsFiles => {
        return answerSet.save();
      }).then(savedAnswerSet => {
        return savedAnswerSet.createJob();
      }).then(createdJob => {
        this.transitionToRoute('jobs.show', createdJob);
      });
    }
  }
});
