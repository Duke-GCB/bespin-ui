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
  value: null,
  answerFormErrors: null,
  fieldErrors: Ember.computed('answerFormErrors.errors.[]', 'fieldName', function() {
    return this.get('answerFormErrors.errors').filterBy('field', this.get('fieldName'));
  }),
  validityDidChange: Ember.on('init', Ember.observer('answerFormErrors', 'value', function() {
    const answerFormErrors = this.get('answerFormErrors');
    if(!answerFormErrors) {
      // We have not answerFormErrors object, bail out
      return;
    }
    const fieldName = this.get('fieldName');
    const value = this.get('value');
    if(Ember.isEmpty(value)) {
      answerFormErrors.setError(fieldName, 'Please enter a value for this field.');
    } else {
      // All Good!
      answerFormErrors.clearError(fieldName);
    }
  })),
  answer: Ember.computed('fieldName','value', function() {
    const fieldName = this.get('fieldName');
    const value = this.get('value');
    const answer = Ember.Object.create();
    if(fieldName && value) {
      answer.set(fieldName, value);
    }
    return answer;
  })
});

StringField.reopenClass({
  positionalParams: ['fieldName','answerChanged']
});

export default StringField;
