import Ember from 'ember';

const AnswerableField = Ember.Component.extend({
  /**
   * A base class for a simple answerable field, like a text field or radio choice
   */
  tagName: 'div',
  classNames: ['row','answerable-field'],
  fieldName: null,
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
});

AnswerableField.reopenClass({
  positionalParams: ['fieldName','answerChanged']
});

// The customization
const ExomeseqStudytypeChoice = AnswerableField.extend({
  /**
   * Encapsulates a radio button to choose from study types
   */
  studyTypes: [
    {value: 'Small Familial', description: 'Small Familial'},
    {value: 'Large Population', description: 'Large Population (Requires 20+ samples)'},
  ],
  actions: {
    pick(choice) {
      this.set('answerValue', choice);
    }
  }
});

export default ExomeseqStudytypeChoice;
