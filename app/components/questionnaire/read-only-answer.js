import Ember from 'ember';

const ReadOnlyAnswer = Ember.Component.extend({
  tagName: 'span',
  store: Ember.inject.service(), // Needs to load dds-projects from the store.
  answer: null,
  stringAnswer: null,
  answerChanged: Ember.on('init', Ember.observer('answer', function() {
    let answer = this.get('answer');
    if(!answer) {
      return null;
    }
    if(answer.get('isString')) {
      let store = this.get('store');
      store.query('job-string-answer', { answer: answer.get('id')}).then((stringAnswers) => {
        let firstAnswer = stringAnswers.get('firstObject');
        this.set('stringAnswer', firstAnswer);
      });
    }
  }))
});

ReadOnlyAnswer.reopenClass({
  positionalParams: ['answer']
});

export default ReadOnlyAnswer;
