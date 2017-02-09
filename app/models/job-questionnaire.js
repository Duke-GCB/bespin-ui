import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  workflowVersion: DS.belongsTo('workflow-version'),
  questions: DS.hasMany('job-question'),
  // Answers not included because it's not in the questionnaire json

});
