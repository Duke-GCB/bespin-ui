import DS from 'ember-data';

export default DS.Model.extend({
  // job-answer has no belongsTo relationship with job-answer-set because job-answer may be on
  answers: DS.hasMany('job-answer', { inverse: null }),
  questionnaire: DS.belongsTo('job-questionnaire'),
  createJob() {
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    let job = adapter.createJob(this.get('id')).then((data) =>{
      this.store.pushPayload('job', data);
    });
    return job;
  }
});
