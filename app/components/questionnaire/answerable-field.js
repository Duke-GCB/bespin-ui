import Ember from 'ember';


const AnswerableField = Ember.Component.extend({
  /**
   * A base class for a simple answerable field, like a text field or radio choice
   */
  classNames: ['row','answerable-field'],
  fieldName: null,
  displayFieldName: Ember.computed('fieldName', function() {
    const fieldName = this.get('fieldName');
    if(fieldName) {
      // convert underscore to spaces, split, capitalize each word, join back together
      return fieldName
        .replace(/_/g, ' ')
        .split(' ')
        .map(x => x.capitalize())
        .join(' ');
    } else {
      return null;
    }
  }),
  answerFormErrors: null,
  answerValue: null,
  answer: Ember.computed('fieldName', 'answerValue', function() {
    const fieldName = this.get('fieldName');
    const answerValue = this.get('answerValue');
    const answer = Ember.Object.create();
    if(fieldName && answerValue) {
      answer.set(fieldName, answerValue);
    }
    return answer;
  }),
  fieldErrors: Ember.computed('answerFormErrors.errors.[]', 'fieldName', function() {
    return this.get('answerFormErrors.errors').filterBy('field', this.get('fieldName'));
  }),
  valueDidChange: Ember.observer('answerValue', function() {
    this.sendAction('answerChanged', this);
  }),
  invalidErrorText: 'Please enter a value for this field.',
  validityDidChange: Ember.on('init', Ember.observer('answerFormErrors', 'answerValue', 'invalidErrorText', function() {
    const answerFormErrors = this.get('answerFormErrors');
    if(!answerFormErrors) {
      // We have not answerFormErrors object, bail out
      return;
    }
    const fieldName = this.get('fieldName');
    const answerValue = this.get('answerValue');
    if(Ember.isEmpty(answerValue)) {
      answerFormErrors.setError(fieldName, this.get('invalidErrorText'));
    } else {
      // All Good!
      answerFormErrors.clearError(fieldName);
    }
  }))
});

AnswerableField.reopenClass({
  positionalParams: ['fieldName','answerChanged']
});

export default AnswerableField
