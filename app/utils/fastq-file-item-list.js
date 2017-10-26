import Ember from 'ember';
import { FileItemList, commonPrefix} from 'bespin-ui/utils/file-item-list';

const DEFAULT_SEPARATOR = '_';

function extractSampleName(name, separator) {
  // Default to '_' if no separator
  if(Ember.isEmpty(separator)) {
    separator = DEFAULT_SEPARATOR;
  }

  // Split on the separator
  const sampleName = name.split(separator)[0];
  return sampleName;
}

function makeSamplePair(fileItemGroup, fileItemPropertyName) {
  const fileItem1 = fileItemGroup.objectAt(0) || Ember.Object.create();
  const fileItem2 = fileItemGroup.objectAt(1) || Ember.Object.create();
  const prefix = commonPrefix(fileItem1.get('name'), fileItem2.get('name'));
  const sampleName = extractSampleName(prefix);
  return Ember.Object.create({
    name: sampleName,
    file1: fileItem1.get(fileItemPropertyName),
    file2: fileItem2.get(fileItemPropertyName)
  });
}
// The internal data structure
const FASTQFileItemList = FileItemList.extend({
  groupSize: 2,
  isComplete: Ember.computed('fileItemGroups.[]', function() {
    const fullGroups = this.get('fileItemGroups').filterBy('length', this.get('groupSize'));
    return this.get('fastqFilePairs.length') == fullGroups.get('length');
  }),

  hasUniqueSampleNames: Ember.computed('fastqFilePairs.[]', function() {
    const pairs = this.get('fastqFilePairs');
    const uniquePairs = this.get('fastqFilePairs').uniqBy('name');
    return pairs.get('length') === uniquePairs.get('length');
  }),

  hasUnnamedSamples: Ember.computed('fastqFilePairs.[]', function() {
    const emptyPairNames = this.get('fastqFilePairs').filterBy('name', '');
    return emptyPairNames.get('length') > 0;
  }),

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

export { FASTQFileItemList, extractSampleName };
