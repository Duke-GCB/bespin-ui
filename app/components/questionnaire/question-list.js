import Ember from 'ember';

const QuestionList = Ember.Component.extend({
  questionnaireUtil: null,
});

QuestionList.reopenClass({
  positionalParams: ['questionnaireUtil']
});

export default QuestionList;
