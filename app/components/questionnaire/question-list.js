import Ember from 'ember';

const QuestionList = Ember.Component.extend({
  tagName: 'ul',
  classNames: ['list-unstyled', 'question-list'],
  questionnaireProxy: null,
  questionProxies: Ember.computed.alias('questionnaireProxy.questionProxies')
});

QuestionList.reopenClass({
  positionalParams: ['questionnaireProxy']
});

export default QuestionList;
