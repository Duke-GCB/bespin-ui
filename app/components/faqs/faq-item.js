import Ember from 'ember';

const FAQItem = Ember.Component.extend({
  faq: null,
  answer: Ember.computed.alias('faq.answer'),
  question: Ember.computed.alias('faq.question')
});

FAQItem.reopenClass({
  positionalParams: ['faq']
});

export default FAQItem;
