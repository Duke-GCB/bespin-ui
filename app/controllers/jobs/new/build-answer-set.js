import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    back() {
      let workflowVersionId = this.get('model.questionnaire.workflowVersion.id');
      this.transitionToRoute('jobs.new.select-questionnaire', workflowVersionId);
    },
    saveAndCreateJob() {
      // Must save all the things that compose an answer set
      let answerSet = this.get('model');
      // To call save on the related model, we must resolve it as a promise
      // Save the input files and stage groups
      answerSet.get('stageGroup').then(stageGroup => {
        return stageGroup.save();
      }).then((savedStageGroup) => {
        return Ember.RSVP.all(
          // save the dds files
          savedStageGroup.get('ddsFiles').map(ddsFile => { return ddsFile.save(); })
        );
      }).then(() => {
        return answerSet.save();
      }).then(savedAnswerSet => {
        return savedAnswerSet.createJob();
      }).then(createdJob => {
        this.transitionToRoute('jobs.show', createdJob);
      });
    }
  }
});
