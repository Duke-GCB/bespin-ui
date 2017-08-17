import Ember from 'ember';

const FundCode = Ember.Component.extend({
  classNames: ['row', 'fund-code']
});

FundCode.reopenClass({
  positionalParams: ['answerSet']
});

export default FundCode;
