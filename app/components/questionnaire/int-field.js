import { isEmpty } from '@ember/utils';
import { observer } from '@ember/object';
import { on } from '@ember/object/evented';
import AnswerableField from './answerable-field';

const IntField = AnswerableField.extend({
  /**
   * Encapsulates a numeric field for a single integer
   * JS just uses the base AnswerableField
   */
  invalidErrorText: 'Please enter an integer value for this field.',
  validityDidChange: on('init', observer('answerFormErrors', 'answerValue', 'invalidErrorText', function() {
    const answerFormErrors = this.get('answerFormErrors');
    if(!answerFormErrors) {
      // We have not answerFormErrors object, bail out
      return;
    }
    const fieldName = this.get('fieldName');
    const answerValue = this.get('answerValue');
    if (!isEmpty(answerValue) && answerValue.match(/^\d+$/)) {
      // All Good!
      answerFormErrors.clearError(fieldName);
    } else {
      answerFormErrors.setError(fieldName, this.get('invalidErrorText'));
    }
  }))
});

export default IntField;
