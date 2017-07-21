import Ember from 'ember';

const DDSFilePicker = Ember.Component.extend({
  project: null,
  store: Ember.inject.service(), // Needs access to store to query for children
  resources: null, // Can be files or folders
  filePicked: function(/* file */) {},
  selectedResources: null,
  actions: {
    // Passed down to each node
    pickFile(file) { this.get('filePicked')(file); }
  },
  projectChanged: Ember.on('init', Ember.observer('project', function() {
    if(! this.get('project.id')) {
      return;
    }
    this.get('store').query('dds-resource', {
      project_id: this.get('project.id')
    }).then((resources) => {
      this.set('resources', resources.sortBy('name'));
    });
  }))
});

DDSFilePicker.reopenClass({
  positionalParams: ['project', 'selectedResources', 'filePicked']
});

export default DDSFilePicker;
