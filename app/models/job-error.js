import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  jobStep: DS.attr('string'),
  created: DS.attr('date'),
  job: DS.belongsTo('job')
});
