import { computed, observer } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

const DDSFilePicker = Component.extend({
  project: null,
  store: service(), // Needs access to store to query for children
  children: null, // Can be files or folders
  onPick: (/* file */) => {},
  selectedResources: null,
  formatSettings: null,
  isLoading: computed('project', 'children', function() {
    let project = this.get('project');
    let children = this.get('children');
    if(project != null && children == null) {
      // Only loading if a project has been selected but no children yet
      return true;
    } else {
      return false;
    }
  }),
  headerTitle: computed('formatSettings.title', function() {
    let formatSettingsTitle = this.get('formatSettings.title');
    if (formatSettingsTitle) {
      return 'Select All ' + formatSettingsTitle + ' Files';
    }
    return 'Select All Files';
  }),
  actions: {
    // Passed down to each node
    pickFile(file) { this.get('onPick')(file); },
    pickAllFilesClicked() { this.pickAllFiles(); }
  },
  pickAllFiles() {
    let files = this.get('children').filterBy('isFile');
    const fileNameRegexStr = this.get('formatSettings.fileNameRegexStr');
    if (fileNameRegexStr) {
      const fileNameRegex = new RegExp(fileNameRegexStr);
      files = files.filter((item) => fileNameRegex.test(item.get('name')));
    }
    let onPick = this.get('onPick');
    files.forEach(onPick);
  },
  hasFiles: computed('children', function() {
    const children = this.get('children');
    if(children == null) {
      return false;
    }
    return children.filterBy('isFile').get('length') > 0;
  }),
  projectChanged: observer('project', function() {
    this.set('children', null); // Clears out children so that loading indicator displays
    // This observer watches changes to the project and loads the project's top-level children when it changes.
    // Therefore, it only makes sense to change the project of the top-level dds-file-picker component
    if (!this.get('project.id')) {
      return;
    }
    this.get('store').query('dds-resource', {
      project_id: this.get('project.id')
    }).then((resources) => {
      this.set('children', resources.sortBy('name'));
    });
  })
});

DDSFilePicker.reopenClass({
  positionalParams: ['project', 'selectedResources', 'onPick']
});

export default DDSFilePicker;
