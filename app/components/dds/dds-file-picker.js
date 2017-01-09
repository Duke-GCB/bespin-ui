import Ember from 'ember';

const DDSFilePicker = Ember.Component.extend({
  store: Ember.inject.service(),
  files: [],
  actions: {
    addFile(file) {

    },
    removeFile(file) {

    }
  },
  projectChanged: Ember.observer('project', function() {
    this.get('store').query('dds-resource', {
      project_id: this.get('project.id')
    }).then((resources) => {
      this.set('resources', resources);
    });
  })
});

DDSFilePicker.reopenClass({
  positionalParams: ['project']
});

export default DDSFilePicker;
