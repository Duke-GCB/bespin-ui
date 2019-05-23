import { alias } from '@ember/object/computed';
import Component from '@ember/component';

const FAQItem = Component.extend({
  classNames: ['faq-item'],
  faq: null,
  answer: alias('faq.answer'),
  question: alias('faq.question')
});

FAQItem.reopenClass({
  positionalParams: ['faq']
});

export default FAQItem;
