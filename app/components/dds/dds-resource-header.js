import Ember from 'ember';

export default Ember.Component.extend({
  icon: 'glyphicon-plus',
  tagName: 'span',
  classNames: ['dds-resource-header'],
  title: 'Select All Files',
  click() {
    this.sendAction();
  }
});
