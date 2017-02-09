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
    { dataType: QuestionDataTypes.String,  userAnswerKind: 'string', userAnswerModel: 'job-string-answer'},
    { dataType: QuestionDataTypes.Integer, userAnswerKind: 'string', userAnswerModel: 'job-string-answer'},
    { dataType: QuestionDataTypes.File, userAnswerKind: 'dds_file', userAnswerModel: 'job-dds-file-answer'},
    { dataType: QuestionDataTypes.Directory, userAnswerKind: 'dds_output_directory', userAnswerModel: 'job-dds-output-directory-answer'}
  ],
  key: DS.attr('string'),
  name: DS.attr('string'),
  dataType: DS.attr('string'),
  occurs: DS.attr('number'),
  isFile: Ember.computed('dataType', function() { return this.get('dataType') === QuestionDataTypes.File; }),
  isString: Ember.computed('dataType', function() { return this.get('dataType') === QuestionDataTypes.String; }),
  isInteger: Ember.computed('dataType', function() { return this.get('dataType') === QuestionDataTypes.Integer; }),
  isDirectory: Ember.computed('dataType', function() { return this.get('dataType') === QuestionDataTypes.Directory; }),

  typeHash: Ember.computed('dataType', function() {
    let dataType = this.get('dataType');
    let typesToModels = this.get('typesToModels');
    return typesToModels.findBy('dataType', dataType);
  }),

  userAnswerKind: Ember.computed('typeHash', function() {
    return this.get('typeHash').userAnswerKind;
  }),
  modelForUserAnswerValue: Ember.computed('typeHash', function() {
    return this.get('typeHash').userAnswerModel;
  })
});
