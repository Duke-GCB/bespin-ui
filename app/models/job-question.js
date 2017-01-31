import DS from 'ember-data';
import Ember from 'ember';

const QuestionDataTypes = {
  String: 'string',
  Integer: 'int',
  File: 'File',
  Directory: 'Directory'
};


export default DS.Model.extend({
  typesToModels: [
    { dataType: QuestionDataTypes.String,  userAnswerModel: 'job-string-answer'},
    { dataType: QuestionDataTypes.Integer, userAnswerModel: 'job-string-answer'},
    { dataType: QuestionDataTypes.File, userAnswerModel: 'job-dds-file-answer'},
    { dataType: QuestionDataTypes.Directory, userAnswerModel: 'job-dds-output-directory-answer'}
  ],
  key: DS.attr('string'),
  name: DS.attr('string'),
  dataType: DS.attr('string'),
  occurs: DS.attr('number'),
  isFile: Ember.computed('dataType', function() { return this.get('dataType') === QuestionDataTypes.File; }),
  isString: Ember.computed('dataType', function() { return this.get('dataType') === QuestionDataTypes.String; }),
  isInteger: Ember.computed('dataType', function() { return this.get('dataType') === QuestionDataTypes.Integer; }),
  isDirectory: Ember.computed('dataType', function() { return this.get('dataType') === QuestionDataTypes.Directory; }),
  userAnswerKind: Ember.computed('dataType', function() {
    if(this.get('isFile')) {
      return 'dds_file'; // Users answering file questions must respond with a dds_file
    } else {
      return 'string';
    }
  }),
  modelForUserAnswerValue: Ember.computed('dataType', function() {
    let dataType = this.get('dataType')
    let typesToModels = this.get('typesToModels');
    let foundType = typesToModels.findBy('dataType', dataType).userAnswerModel;
    return foundType;
  })
});
