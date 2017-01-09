import Ember from 'ember';

const DDSProjectPicker = Ember.Component.extend({
  classNames: ['dds-project-picker'],
  selectedProject: null,
  actions: {
    pick(project) {
      this.get('onPick')(project);
    }
  }
});

DDSProjectPicker.reopenClass({
  positionalParams: ['projects','selectedProject', 'onPick']
});

export default DDSProjectPicker;
