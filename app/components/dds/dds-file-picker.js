import Ember from 'ember';

const DDSFilePicker = Ember.Component.extend({
  project: null,
  store: Ember.inject.service(), // Needs access to store to query for children
  children: null, // Can be files or folders
  onPick: (/* file */) => {},
  selectedResources: null,
  fileFilter: (/*item, index, enumerable*/) => {return true},
  actions: {
    // Passed down to each node
    pickFile(file) { this.get('onPick')(file); },
    pickAllFilesClicked() { this.pickAllFiles(); }
  },
  pickAllFiles() {
    let files = this.get('children').filterBy('isFile');
    let onPick = this.get('onPick');
    files.forEach(onPick);
  },
  hasFiles: Ember.computed('children', function() {
    const children = this.get('children');
    if(children == null) {
      return false;
    }
    return children.filterBy('isFile').get('length') > 0;
  }),
  projectChanged: Ember.on('init', Ember.observer('project', function() {
    if(! this.get('project.id')) {
      return;
    }
    const fileFilter = this.get('fileFilter');
    this.get('store').query('dds-resource', {
      project_id: this.get('project.id')
    }).then((resources) => {
      let filteredFiles = resources.filter(fileFilter);
      this.set('children', filteredFiles.sortBy('name'));
    });
  }))
});

DDSFilePicker.reopenClass({
  positionalParams: ['project', 'selectedResources', 'onPick']
});

export default DDSFilePicker;
