import Component from '@ember/component';

export default Component.extend({
  title: 'Select All Files',
  icon: 'glyphicon-plus',
  tagName: 'span',
  classNames: ['dds-resource-header'],
  click() {
    this.sendAction();
  }
});
