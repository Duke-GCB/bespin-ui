import Ember from 'ember';

const FileGroupList = Ember.Component.extend({
  /**
   * Encapsulates a file picker and a grouping/pairing control
   */
  groupSize: 2,
  fieldName: null,
  provideAnswer: (/* fieldName, value */) => {},
  provideFiles: () => {}, // returns an array of DDSJobInputFiles
  ddsProjects: Ember.inject.service(),
  projects: Ember.computed.alias('ddsProjects.projects'),
  selectedResources: Ember.computed.alias('files.[]'),
  files: null,
  groups: Ember.computed('files.[]', 'groupSize', function() {
    let files = this.get('files');
    let fileCount = files.get('length');
    let groupSize = this.get('groupSize');
    let groups = [];
    for(let i = 0;i < fileCount;i = i + groupSize) {
      const group = [];
      for(let j = i; j < i + groupSize && j < fileCount; j++){
        group.pushObject(files.objectAt(j));
      }
      groups.pushObject(group);
    }
    return groups;
  }),
  actions: {
    addFile(file) {
      this.get('files').pushObject(file);
    },
    provide() {
      // Call provideAnswer with our fieldName and the assembled value
      // Convert the pair array to a CWL job Order
      let groups = this.get('groups').map(function (group) {
        return group.map(function(file, index) {
          return file.cwlFileObject(index);
        });
      });
      this.get('provideAnswer')(this.get('fieldName'), groups);
    },
    removeAt(groupIndex, fileIndex) {
      let index = this.get('groupSize') * groupIndex + fileIndex;
      this.get('files').removeAt(index);
    }
  },
  init(){
    this._super(...arguments);
    if(Ember.isEmpty(this.get('files'))) {
      this.set('files', []);
    }
  }
});

FileGroupList.reopenClass({
  positionalParams: ['fieldName','provideAnswer']
});

export default FileGroupList;
