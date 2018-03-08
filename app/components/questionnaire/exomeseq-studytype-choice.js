import AnswerableField from './answerable-field';

// The customization
const ExomeseqStudytypeChoice = AnswerableField.extend({
  /**
   * Encapsulates a radio button to choose from study types
   */
  studyTypes: [
    {value: 'Small Familial', description: 'Small Familial'},
    {value: 'Large Population', description: 'Large Population (Requires 20+ samples)'},
  ],
  invalidErrorText: 'Please choose a study type',
  actions: {
    pick(choice) {
      this.set('answerValue', choice);
    }
  }
});

export default ExomeseqStudytypeChoice;
