import DS from 'ember-data';

export default DS.Model.extend({
  value: DS.attr('string'),
  answer: DS.belongsTo('job-answer')
});
