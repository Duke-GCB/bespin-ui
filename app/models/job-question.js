import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  key: DS.attr('string'),
  name: DS.attr('string'),
  dataType: DS.attr('string'),
  occurs: DS.attr('number'),
  isFile: Ember.computed('dataType', function() { return this.get('dataType') === 'File'; }),
  isString: Ember.computed('dataType', function() { return this.get('dataType') === 'string'; }),
  isInteger: Ember.computed('dataType', function() { return this.get('dataType') === 'int'; }),
  userAnswerKind: Ember.computed('dataType', function() {
    if(this.get('isFile')) {
      return 'dds_file'; // Users answering file questions must respond with a dds_file
    } else {
      return 'string';
    }
  }),
  modelForUserAnswerValue: Ember.computed('dataType', function() {
    if(this.get('isFile')) {
      return 'job-dds-file-answer';
    } else {
      return 'job-string-answer';
    }
  })
});
