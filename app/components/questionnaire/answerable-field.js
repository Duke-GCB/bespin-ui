import { isEmpty } from '@ember/utils';
import { on } from '@ember/object/evented';
import EmberObject, { computed, observer } from '@ember/object';
import Component from '@ember/component';
import DisplayFieldLabelMixin from 'bespin-ui/mixins/display-field-label-mixin';
import { assert } from '@ember/debug';

const AnswerableField = Component.extend(DisplayFieldLabelMixin, {
  /**
   * A base class for a simple answerable field, like a text field or radio choice
   */
  classNames: ['row','answerable-field'],
  fieldName: null,
  fieldLabel: null,
  answerFormErrors: null,
  answerValue: null,
  answer: computed('fieldName', 'answerValue', function() {
    const fieldName = this.get('fieldName');
    const answerValue = this.get('answerValue');
    const answer = EmberObject.create();
    if(fieldName && answerValue) {
      answer.set(fieldName, answerValue);
    }
    return answer;
  }),
  fieldErrors: computed('answerFormErrors.errors.[]', 'fieldName', function() {
    return this.get('answerFormErrors.errors').filterBy('field', this.get('fieldName'));
  }),
  valueDidChange: observer('answerValue', function() {
    this.sendAction('answerChanged', this);
  }),
  invalidErrorText: 'Please enter a value for this field.',
  validityDidChange: on('init', observer('answerFormErrors', 'answerValue', 'invalidErrorText', function() {
    const answerFormErrors = this.get('answerFormErrors');
    if(!answerFormErrors) {
      // We have not answerFormErrors object, bail out
      return;
    }
    const fieldName = this.get('fieldName');
    const answerValue = this.get('answerValue');
    if(isEmpty(answerValue)) {
      answerFormErrors.setError(fieldName, this.get('invalidErrorText'));
    } else {
      // All Good!
      answerFormErrors.clearError(fieldName);
    }
  })),
  didReceiveAttrs() {
    this._super(...arguments);
    assert('Answerable component requires fieldName property', this.get('fieldName'));
    assert('Answerable component requires answerChanged function property', typeof this.get('answerChanged') == 'function');
  },
});

AnswerableField.reopenClass({
  positionalParams: ['fieldName','answerChanged']
});

export default AnswerableField
