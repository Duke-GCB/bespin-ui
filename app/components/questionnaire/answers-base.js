import Ember from 'ember';

const AnswersBase = Ember.Component.extend({
  questionProxy: null,
  readOnly: Ember.computed.readOnly('questionProxy.readOnly'),
  answerValuePairs: Ember.computed(
    'readOnly',
    'questionProxy.userAnswerValuePairs.[]',
    'questionProxy.systemAnswerValuePairs.[]',
    function() {
      if(this.get('readOnly')) {
        return this.get('questionProxy.systemAnswerValuePairs');
      } else {
        return this.get('questionProxy.userAnswerValuePairs');
      }
  })
});

AnswersBase.reopenClass({
  positionalParams: ['questionProxy']
});

export default AnswersBase;
