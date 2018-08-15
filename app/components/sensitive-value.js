import Ember from 'ember';

const SensitiveValue = Ember.Component.extend({
  value: null,
  hideValue: true,
  displayedValue: Ember.computed('value', 'hideValue', function () {
    const value = this.get('value');
    if (value && this.get('hideValue')) {
      return value.replace(/./g, '*');
    } else {
      return value;
    }
  }),
  actions: {
    showValue() {
      this.set('hideValue', false);
    }
  }
});

SensitiveValue.reopenClass({
  positionalParams: ['value']
});

export default SensitiveValue;
