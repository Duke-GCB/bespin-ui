import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  workflow: DS.belongsTo('workflow'),
  description: DS.attr('string'),
  objectName: DS.attr('string'),
  created: DS.attr('date'),
  url: DS.attr('string'),
  version: DS.attr('string'),
  jobs: DS.hasMany('job'),
  questionnaires: DS.hasMany('job-questionnaire'),
  displayName: Ember.computed('workflow.name', 'version', function() {
    return this.get('workflow.name') + ' - Version' + this.get('version');
  }),
});
