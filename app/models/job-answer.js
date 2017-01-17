import DS from 'ember-data';

export default DS.Model.extend({
  index: DS.attr('number'),
  kind: DS.attr('string'),
  question: DS.belongsTo('job-question'),
  questionnaire: DS.belongsTo('job-questionnaire')
});
