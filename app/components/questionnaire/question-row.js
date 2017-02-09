import Ember from 'ember';

const QuestionRow = Ember.Component.extend({
  tagName: 'li',
  classNames: ['question-row', 'well','well-sm'],
  questionProxy: null,
  question: Ember.computed.alias('questionProxy.question')
});

QuestionRow.reopenClass({
  positionalParams: ['questionProxy']
});

export default QuestionRow;
