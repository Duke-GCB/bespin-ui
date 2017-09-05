import Ember from 'ember';
import FilenameFilter from 'bespin-ui/utils/filename-filter';

const DDSProjectFilesPicker = Ember.Component.extend({
  projects: null,
  project: null,
  selectedResources: null,
  onFilePicked: function(/* file */) {},
  fileFilter: function(/*item, index, enumerable*/) {return true},
  init() {
    this._super(...arguments);
    const fileNameRegexStr = this.get('fileNameRegexStr');
    if (fileNameRegexStr) {
      const fileFilter = FilenameFilter.create({ fileNameRegexStr: fileNameRegexStr});
      this.set('fileFilter', fileFilter.filter.bind(fileFilter));
    }
  },
  actions: {
    projectChanged(project) {
      this.set('project', project);
    },
    filePicked(file) {
      this.get('onFilePicked')(file);
    }
  }
});

DDSProjectFilesPicker.reopenClass({
  positionalParams: ['projects', 'selectedResources', 'onFilePicked']
});

export default DDSProjectFilesPicker;
