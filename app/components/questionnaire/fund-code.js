import Component from '@ember/component';

const FundCode = Component.extend({
  classNames: ['row', 'fund-code']
});

FundCode.reopenClass({
  positionalParams: ['answerSet']
});

export default FundCode;
