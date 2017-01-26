import Ember from 'ember';

const QuestionList = Ember.Component.extend({
  questionnaire: null

});

QuestionList.reopenClass({
  positionalParams: ['questionnaire']
});

export default QuestionList;
