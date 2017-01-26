import Ember from 'ember';

const QuestionRow = Ember.Component.extend({
  classNames: ['well','well-sm'],
  question: null
});

QuestionRow.reopenClass({
  positionalParams: ['question']
});

export default QuestionRow;
