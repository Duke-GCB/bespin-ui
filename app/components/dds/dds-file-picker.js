import Ember from 'ember';

const DDSFilePicker = Ember.Component.extend({
  store: Ember.inject.service(),
  pickedFiles: [],
  actions: {
    toggleResource(file) {
      let pickedFiles = this.get('pickedFiles');
      if(pickedFiles.includes(file)) {
        pickedFiles.removeObject(file);
      } else {
        pickedFiles.addObject(file);
      }
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
  positionalParams: ['project', 'pickedFiles']
});

export default DDSFilePicker;
