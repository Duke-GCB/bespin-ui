import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['dds-resource-header'],
  click() {
    this.sendAction();
  }
});
