import Ember from 'ember';

const QuestionList = Ember.Component.extend({
  questions: []

});

QuestionList.reopenClass({
  positionalParams: ['questions']
});

export default QuestionList;
