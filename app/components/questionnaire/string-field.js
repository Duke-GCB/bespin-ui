import Ember from 'ember';

const StringField = Ember.Component.extend({
  /**
   * Encapsulates a text field for a single string answer
   */
  tagName: 'div',
  classNames: ['row','string-field'],
  fieldName: null,
  displayFieldName: Ember.computed('fieldName', function() {
    const fieldName = this.get('fieldName');
    if(fieldName) {
      return fieldName.capitalize();
    } else {
      return null;
    }
  }),
  stringValue: null,
  answerFormErrors: null,
  fieldErrors: Ember.computed('answerFormErrors.errors.[]', 'fieldName', function() {
    return this.get('answerFormErrors.errors').filterBy('field', this.get('fieldName'));
  }),
  validityDidChange: Ember.on('init', Ember.observer('answerFormErrors', 'stringValue', function() {
    const answerFormErrors = this.get('answerFormErrors');
    if(!answerFormErrors) {
      // We have not answerFormErrors object, bail out
      return;
    }
    const fieldName = this.get('fieldName');
    const stringValue = this.get('stringValue');
    if(Ember.isEmpty(stringValue)) {
      answerFormErrors.setError(fieldName, 'Please enter a value for this field.');
    } else {
      // All Good!
      answerFormErrors.clearError(fieldName);
    }
  })),
  answer: Ember.computed('fieldName', 'stringValue', function() {
    const fieldName = this.get('fieldName');
    const stringValue = this.get('stringValue');
    const answer = Ember.Object.create();
    if(fieldName && stringValue) {
      answer.set(fieldName, stringValue);
    }
    return answer;
  }),
  valueDidChange: Ember.observer('stringValue', function() {
    this.sendAction('answerChanged', this);
  })
});

StringField.reopenClass({
  positionalParams: ['fieldName','answerChanged']
});

export default StringField;
