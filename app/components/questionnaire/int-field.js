import AnswerableField from './answerable-field';
import Ember from "ember";

const IntField = AnswerableField.extend({
  /**
   * Encapsulates a numeric field for a single integer
   * JS just uses the base AnswerableField
   */
  invalidErrorText: 'Please enter an integer value for this field.',
  validityDidChange: Ember.on('init', Ember.observer('answerFormErrors', 'answerValue', 'invalidErrorText', function() {
    const answerFormErrors = this.get('answerFormErrors');
    if(!answerFormErrors) {
      // We have not answerFormErrors object, bail out
      return;
    }
    const fieldName = this.get('fieldName');
    const answerValue = this.get('answerValue');
    if (!Ember.isEmpty(answerValue) && answerValue.match(/^\d+$/)) {
      // All Good!
      answerFormErrors.clearError(fieldName);
    } else {
      answerFormErrors.setError(fieldName, this.get('invalidErrorText'));
    }
  }))
});

export default IntField;
