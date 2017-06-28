import Ember from 'ember';
import { FileItemList, FileItem } from 'bespin-ui/utils/file-item-list';

const DEFAULT_GROUP_SIZE = 2;
const DEFAULT_FILE_KIND_NAME = 'read';

const GroupSizes = [
  Ember.Object.create({size: 2, name: 'pairs'})
];

const FileGroupList = Ember.Component.extend({
  /**
   * Encapsulates a file picker and a grouping/pairing control
   */
  tagName: 'li',
  classNames: ['file-group-list'],
  fileKindName: DEFAULT_FILE_KIND_NAME, // What kind of file are we picking?
  groupSize: DEFAULT_GROUP_SIZE,
  groupSizeName: Ember.computed('groupSize', function() {
    return GroupSizes.findBy('size', this.get('groupSize')).get('name');
  }),
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
