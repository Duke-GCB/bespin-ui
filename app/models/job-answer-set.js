import DS from 'ember-data';

export default DS.Model.extend({
  answers: DS.hasMany('job-answer'),
  questionnaire: DS.belongsTo('job-questionnaire')
});
