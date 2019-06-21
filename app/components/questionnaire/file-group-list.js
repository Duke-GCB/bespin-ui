import { isEmpty } from '@ember/utils';
import { alias, map } from '@ember/object/computed';
import EmberObject, { computed } from '@ember/object';
import { FileItemList, FileItem } from 'bespin-ui/utils/file-item-list';
import DDSProjectField from './dds-project-field';
import { assert } from '@ember/debug';

const DEFAULT_GROUP_SIZE = 2;

const GroupSizes = [
  EmberObject.create({size: 2, name: 'pairs'})
];

const FileGroupList = DDSProjectField.extend({
  /**
   * Encapsulates a file picker and a grouping/pairing control
   */
  tagName: 'div',
  classNames: ['file-group-list', 'row'],
  formatSettings: null,  // settings based on cwl type and format
  groupSize: DEFAULT_GROUP_SIZE,
  groupSizeName: computed('groupSize', function() {
    return GroupSizes.findBy('size', this.get('groupSize')).get('name');
  }),
  fieldName: null,
  fileItems: null,
  selectedDdsFiles: alias('fileItems.ddsFiles'),
  groups: map('fileItems.fileItemGroups', function(fileItemGroup) {
    return fileItemGroup.mapBy('ddsFile');
  }),
  groupTitle: computed('formatSettings.groupName', function() {
    return this.get('formatSettings.groupName') || 'file';
  }),
  answer: computed('fieldName', 'fileItems.cwlObjectValue.[]', function() {
    const fieldName = this.get('fieldName');
    const answer = EmberObject.create();
    answer.set(fieldName, this.get('fileItems.cwlObjectValue'));
    return answer;
  }),
  inputFiles: alias('fileItems.inputFiles.[]'),
  index: null, // order within the questionnaire
  actions: {
    addFile(file) {
      const credential = this.get('credential');
      // Temporarily removing prefix to preserve original file names.
      // See https://github.com/Duke-GCB/bespin-ui/issues/39
      const prefix = ''; // `${this.get('fieldName')}_${Date.now()}_`;
      const fileItem = FileItem.create({ddsFile: file, prefix: prefix, credential: credential});
      this.get('fileItems').addFileItem(fileItem);
      this.sendAction('answerChanged', this);
    },
    removeAt(groupIndex, fileIndex) {
      this.get('fileItems').removeFileItem(groupIndex, fileIndex);
      this.sendAction('answerChanged', this);
    }
  },

  // Message to display if additional functionality is available elsewhere (e.g. CLI)
  featureSupportMessage: null,

  init() {
    this._super(...arguments);
    if(isEmpty(this.get('fileItems'))) {
      this.set('fileItems', FileItemList.create());
    }
  },
  didReceiveAttrs() {
    this._super(...arguments);
    assert('Answerable component requires fieldName property', this.get('fieldName'));
    assert('Answerable component requires answerChanged function property', typeof this.get('answerChanged') == 'function');
  },
});

FileGroupList.reopenClass({
  positionalParams: ['fieldName','answerChanged']
});

export default FileGroupList;
