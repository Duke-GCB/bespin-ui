import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  jobStep: DS.attr('string'),
  created: DS.attr('date'),
  job: DS.belongsTo('job'),
  stepIsCreateVm: computed('jobStep', function() {
    return this.get('jobStep') === 'V';
  }),
  stepIsStaging: computed('jobStep', function() {
    return this.get('jobStep') === 'S';
  }),
  stepIsRunning: computed('jobStep', function() {
    return this.get('jobStep') === 'R';
  }),
  stepIsStoreOutput: computed('jobStep', function() {
    return this.get('jobStep') === 'O';
  }),
  stepIsTerminateVm: computed('jobStep', function() {
    return this.get('jobStep') === 'T';
  }),
});
