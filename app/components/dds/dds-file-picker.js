import Ember from 'ember';

const DDSFilePicker = Ember.Component.extend({
  store: Ember.inject.service(),
  pickedResources: [], //Ember.MutableArray(),
  actions: {
    toggleResource(resource) {
      let pickedResources = this.get('pickedResources');
      if(pickedResources.includes(resource)) {
        pickedResources.removeObject(resource);
      } else {
        pickedResources.addObject(resource);
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
  positionalParams: ['project']
});

export default DDSFilePicker;
