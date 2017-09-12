import Ember from 'ember';

export default Ember.Component.extend({
  icon: 'glyphicon-plus',
  tagName: 'span',
  classNames: ['dds-resource-header'],
  formatSettings: {},
  title: Ember.computed('formatSettings.title', function() {
    let formatSettingsTitle = this.get('formatSettings.title');
    if (formatSettingsTitle) {
      return 'Select All ' + formatSettingsTitle + ' Files';
    }
    return 'Select All Files';
  }),
  click() {
    this.sendAction();
  }
});
