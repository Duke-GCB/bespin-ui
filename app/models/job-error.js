import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  jobStep: DS.attr('string'),
  created: DS.attr('date'),
  job: DS.belongsTo('job'),
  stepIsCreateVm: Ember.computed('state', function() {
    return this.get('jobStep') === 'V';
  }),
  stepIsStaging: Ember.computed('state', function() {
    return this.get('jobStep') === 'S';
  }),
  stepIsRunning: Ember.computed('state', function() {
    return this.get('jobStep') === 'R';
  }),
  stepIsStoreOutput: Ember.computed('state', function() {
    return this.get('jobStep') === 'O';
  }),
  stepIsTerminateVm: Ember.computed('state', function() {
    return this.get('jobStep') === 'T';
  }),
});
