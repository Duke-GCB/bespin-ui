import Ember from 'ember';

const DDSProjectPicker = Ember.Component.extend({
  classNames: ['dds-project-picker'],
  selectedProject: null,
  actions: {
    pick(project) {
      this.set('selectedProject', project);
    }
  }
});

DDSProjectPicker.reopenClass({
  positionalParams: ['projects','selectedProject']
});

export default DDSProjectPicker;
