import DS from 'ember-data';

export default DS.Model.extend({
  stageGroup: DS.belongsTo('job-file-stage-group'),
  url: DS.attr('string'),
  destinationPath: DS.attr('string'),
  size: DS.attr('number'),
  sequence: DS.attr('number'),
});
