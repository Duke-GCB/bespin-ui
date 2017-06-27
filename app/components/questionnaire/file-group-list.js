import Ember from 'ember';
import { FileItemList, FileItem } from 'bespin-ui/utils/file-item-list';

const FileGroupList = Ember.Component.extend({
  /**
   * Encapsulates a file picker and a grouping/pairing control
   */
  tagName: 'li',
  classNames: ['file-group-list'],
  groupSize: 2,
  fieldName: null,
  ddsProjects: Ember.inject.service(),
  ddsUserCredentials: Ember.inject.service(),
  projects: Ember.computed.alias('ddsProjects.projects'),
  fileItems: null,
  selectedDdsFiles: Ember.computed.alias('fileItems.ddsFiles'),
  groups: Ember.computed.map('fileItems.fileItemGroups', function(fileItemGroup) {
    return fileItemGroup.mapBy('ddsFile');
  }),
  answer: Ember.computed('fieldName', 'fileItems.cwlObjectValue', function() {
    const fieldName = this.get('fieldName');
    const answer = Ember.Object.create();
    answer.set(fieldName, this.get('fileItems.cwlObjectValue'));
    return answer;
  }),
  inputFiles: Ember.computed.alias('fileItems.inputFiles.[]'),
  actions: {
    addFile(file) {
      const credential = this.get('ddsUserCredentials.primaryCredential');
      const prefix = `${this.get('fieldName')}_${Date.now()}`;
      const fileItem = FileItem.create({ddsFile: file, prefix: prefix, credential: credential});
      this.get('fileItems').addFileItem(fileItem);
      this.sendAction('answerChanged', this);
    },
    removeAt(groupIndex, fileIndex) {
      this.get('fileItems').removeFileItem(groupIndex, fileIndex);
      this.sendAction('answerChanged', this);
    }
  },
  init(){
    this._super(...arguments);
    // Force a load of the credentials service. This is a hack!
    this.get('ddsUserCredentials');
    if(Ember.isEmpty(this.get('fileItems'))) {
      this.set('fileItems', FileItemList.create());
    }
  }
});

FileGroupList.reopenClass({
  positionalParams: ['fieldName','answerChanged']
});

export default FileGroupList;
