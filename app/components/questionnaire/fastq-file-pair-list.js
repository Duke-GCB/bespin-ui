import Ember from 'ember';
import FileGroupList from 'bespin-ui/components/questionnaire/file-group-list';
import { FileItemList, FileItem } from 'bespin-ui/utils/file-item-list';

// The internal data structure
const FASTQFileItemList = FileItemList.extend({
  groupSize: 2,

  // must compute sample names somehow. override FileItemGroups

  // What are the jobs of this component
  // cwlObjectValue needs to return the new structure
  // in the component, groups is computed from fileItems.fileItemGroups and just pulls out the ddsfile
  cwlObjectValue: Ember.computed('fileItemGroups.[]', function() {
    const fileItemGroups = this.get('fileItemGroups');
    return fileItemGroups.map(function (fileItemGroup) {
      return Ember.Object.create({
        name: 'Fixme cwl object',
        file1: fileItemGroup.objectAt(0).get('cwlObject'),
        file2: fileItemGroup.objectAt(1).get('cwlObject')
      });
    });
  })
});

// The component
const FASTQFilePairList = FileGroupList.extend({
  groupSize: 2,

  groups: Ember.computed.map('fileItems.fileItemGroups', function(fileItemGroup) {
    const group = Ember.Object.create({
      name: 'fixme-group'
    });

    // Check array size before accessing
    if(fileItemGroup.get('length') > 0) {
      group.set('file1',fileItemGroup.objectAt(0).get('ddsFile'));
    }

    if(fileItemGroup.get('length') > 1) {
      group.set('file2',fileItemGroup.objectAt(1).get('ddsFile'));
    }
    return group;
  }),

  // Override init to user our customized FileItemList
  init() {
    this._super(...arguments);
    if(Ember.isEmpty(this.get('fileItems'))) {
      this.set('fileItems', FileItemList.create());
    }
  }
});

export default FASTQFilePairList;
