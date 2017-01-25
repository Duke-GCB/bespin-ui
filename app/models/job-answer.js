import DS from 'ember-data';
import Ember from 'ember';

const AnswerKinds = {
  String: 'string',
  DDSFile: 'dds_file'
};

export default DS.Model.extend({
  index: DS.attr('number'),
  kind: DS.attr('string'),
  question: DS.belongsTo('job-question'),
  questionnaire: DS.belongsTo('job-questionnaire'),
  isString: Ember.computed('kind', function() {
    return this.get('kind') === AnswerKinds.String;
  }),
  isDDSFile: Ember.computed('kind', function() {
    return this.get('kind') === AnswerKinds.DDSFile;
  })

});
