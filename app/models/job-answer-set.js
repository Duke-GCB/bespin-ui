import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  // job-answer has no belongsTo relationship with job-answer-set because job-answer may be on
  questionnaire: DS.belongsTo('job-questionnaire'),
  jobName: DS.attr('string'),
  userJobOrderJson: DS.attr('jsonObject', { // This is JSON.
    // The JSON-encoded job order may be empty, so we default to '{}'
    defaultValue() { return {}; }
  }),
  stageGroup: DS.belongsTo('job-file-stage-group'),
  createJob() {
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    return adapter.createJob(this.get('id')).then((data) =>{
      this.store.pushPayload('job', data);
      // pushPayload doesn't return. There is a feature ds-pushpayload-return added in 2.5 that can be enabled,
      // It changes pushPayload to return the model object, but requires canary builds, which seems overblown.
      // Instead, we use peekRecord to grab it out of the store without fetching, but it doesn't return a promise.
      return Ember.RSVP.resolve(this.store.peekRecord('job', data.jobs.id));
    });
  }
});
