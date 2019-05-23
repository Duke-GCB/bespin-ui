import AnswerableField from './answerable-field';

const StudyTypes = [
  {value: 'Small Familial', description: 'Small Familial'},
  {value: 'Large Population', description: 'Large Population (Requires 20+ samples)'},
];

// The customization
const ExomeseqStudytypeChoice = AnswerableField.extend({
  /**
   * Encapsulates a radio button to choose from study types
   */
  studyTypes: null,
  invalidErrorText: 'Please choose a study type',
  actions: {
    pick(choice) {
      this.set('answerValue', choice);
    }
  },
  init() {
    this._super(...arguments);
    this.studyTypes = StudyTypes;
  }

});

export default ExomeseqStudytypeChoice;
