import Ember from 'ember';

const DDSProjectFilesPicker = Ember.Component.extend({
  projects: [],
  project: null,
  pickedFiles: [],
  onFilesChanged: function() {},
  actions: {
    projectChanged(project) {
      this.set('project', project);
    },
    filesChanged() {
      this.get('onFilesChanged')(this.get('pickedFiles'));
    }
  }
});

DDSProjectFilesPicker.reopenClass({
  positionalParams: ['projects', 'onFilesChanged']
});

export default DDSProjectFilesPicker;
