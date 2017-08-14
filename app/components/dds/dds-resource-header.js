import Ember from 'ember';

export default Ember.Component.extend({
  title: 'Select All Files',
  icon: 'glyphicon-plus',
  tagName: 'span',
  classNames: ['dds-resource-header'],
  click() {
    this.sendAction();
  }
});
