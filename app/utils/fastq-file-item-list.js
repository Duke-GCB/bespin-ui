import Ember from 'ember';
import { FileItemList } from 'bespin-ui/utils/file-item-list';

function splitMultipleSeparators(name, separators) {
  name = name || '';
  separators = separators || [];
  // If more than 1 separator, replace all instances of other separators with the first, then split on first
  const firstSeparator = separators[0];
  separators.slice(1).forEach((otherSeparator) => {
    name = name.replace(otherSeparator, firstSeparator);
  });
  return name.split(firstSeparator);
}

const DEFAULT_SEPARATORS = ['_','-',' '];

function extractSampleName(name, separators) {
  if(Ember.isEmpty(separators)) {
    separators = DEFAULT_SEPARATORS;
  }
  return splitMultipleSeparators(name, separators)[0];
}

function makeSamplePair(fileItemGroup, fileItemPropertyName) {
  const fileItem1 = fileItemGroup.objectAt(0) || Ember.Object.create();
  const fileItem2 = fileItemGroup.objectAt(1) || Ember.Object.create();
  const sampleName1 = extractSampleName(fileItem1.get('name'));
  const sampleName2 = extractSampleName(fileItem2.get('name'));
  let sampleName = '';
  if(sampleName1 === sampleName2) {
    sampleName = sampleName1;
  }
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

export { FASTQFileItemList, extractSampleName, splitMultipleSeparators };
