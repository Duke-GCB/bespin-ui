import Ember from 'ember';

const DDSFilePicker = Ember.Component.extend({
  project: null,
  store: Ember.inject.service(), // Needs access to store to query for children
  resources: [], // Can be files or folders
  pickedFiles: [],
  filesChanged: function() {},
  actions: {
    toggleFile(file) {
      let pickedFiles = this.get('pickedFiles');
      if(pickedFiles.includes(file)) {
        pickedFiles.removeObject(file);
      } else {
        pickedFiles.addObject(file);
      }
      this.get('filesChanged')();
    }
  },
  projectChanged: Ember.on('init', Ember.observer('project', function() {
    if(! this.get('project.id')) {
      Ember.Logger.log('bailing out');
      return;
    }
    this.get('store').query('dds-resource', {
      project_id: this.get('project.id')
    }).then((resources) => {
      this.set('resources', resources);
    });
  }))
});

DDSFilePicker.reopenClass({
  positionalParams: ['project', 'pickedFiles', 'filesChanged']
});

export default DDSFilePicker;
