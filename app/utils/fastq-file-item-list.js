import Ember from 'ember';
import { FileItemList, commonPrefix} from 'bespin-ui/utils/file-item-list';

function makeSamplePair(fileItemGroup, fileItemPropertyName) {
  const fileItem1 = fileItemGroup.objectAt(0) || Ember.Object.create();
  const fileItem2 = fileItemGroup.objectAt(1) || Ember.Object.create();
  return Ember.Object.create({
    name: commonPrefix(fileItem1.get('name'), fileItem2.get('name')),
    file1: fileItem1.get(fileItemPropertyName),
    file2: fileItem2.get(fileItemPropertyName)
  });
}
// The internal data structure
const FASTQFileItemList = FileItemList.extend({
  groupSize: 2,

  //For Presentation
  fastqFilePairs: Ember.computed('fileItemGroups.[]', function() {
    const fileItemGroups = this.get('fileItemGroups');
    return fileItemGroups.map(function (fileItemGroup) {
      return makeSamplePair(fileItemGroup, 'ddsFile')
    });
  }),
  // in the component, groups is computed from fileItems.fileItemGroups and just pulls out the ddsfile
  cwlObjectValue: Ember.computed('fileItemGroups.[]', function() {
    const fileItemGroups = this.get('fileItemGroups');
    return fileItemGroups.map(function (fileItemGroup) {
      return makeSamplePair(fileItemGroup, 'cwlObject');
    });
  })
});

export default FASTQFileItemList;
