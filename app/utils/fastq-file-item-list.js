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
};

const DEFAULT_SEPARATORS = ['_','-',' '];

function extractSampleName(name, separators) {
  if(Ember.isEmpty(separators)) {
    separators = DEFAULT_SEPARATORS;
  }
  return splitMultipleSeparators(name, separators)[0];
}

const FASTQSample = Ember.Object.extend({
  fileItems: null,
  size: 2,
  enforceUniqueness: true,
  sampleName: null,
  generateSampleName: true, // true = class should try to generate sample name when full

  init() {
    this._super(...arguments);
    if(Ember.isEmpty(this.get('fileItems'))) {
      this.set('fileItems', []);
    }
  },
  isFull: Ember.computed('fileItems.length', 'size', function() {
    return this.get('fileItems.length') === this.get('size');
  }),
  ddsFiles: Ember.computed.mapBy('fileItems', 'ddsFile'),
  inputFiles: Ember.computed.mapBy('fileItems', 'inputFile'),
  includesFileItem(fileItem) {
    // Check inclusion based on the ddsFile property by default
    // If the fileItem does not have this property, fallback to object equality
    const ddsFile = Ember.get(fileItem, 'ddsFile');
    if(ddsFile) {
      return this.get('ddsFiles').includes(ddsFile);
    } else {
      return this.get('fileItems').includes(fileItem);
    }
  },

  addFileItem(fileItem) {
    if(!this.get('isFull')) {
      this.get('fileItems').pushObject(fileItem);
      this.generateSampleName();
      return fileItem;
    } else {
      return false;
    }
  },

  generateSampleName() {
    // Bail out if already generated
    if(this.get('generatedSampleName')) {
      return;
    }

    // Bail out if not full
    if(!this.get('isFull')) {
      return;
    }

    const extractedSampleNames = this.get('fileItems').mapBy('name').map((name) => {
      return extractSampleName(name);
    });

    // Now we can either compare all the extracted sample names or just go with the first one.
    this.set('sampleName', extractedSampleNames.objectAt(0));
    this.set('generatedSampleName', true);

  },

  cwlObjectValue: Ember.computed('fileItems.[]', 'sampleName', function() {
    const fileItems = this.get('fileItems');
    let cwlObject = Ember.Object.create({
      name: this.get('sampleName')
    });
    for(let i=0;i<fileItems.get('length');i++) {
      const keyName = `file${i + 1}`;
      const fileItem = fileItems.objectAt(i);
      cwlObject.set(keyName, fileItem.get('cwlObject'));
    }
    return cwlObject;
  })
});

// Wrote this so far. Not sure what to do next.
// I have a basic data structure that supports one sample and 2 files

const FASTQFileItemList = Ember.Object.extend({
  samples: null, // array of FASTQSample objects
  enforceUniqueness: true,
  filesPerSample: 2, // Number of files to put in a sample
  init() {
    this._super(...arguments);
    if(Ember.isEmpty(this.get('samples'))) {
      this.set('samples', []);
    }
  },

  isComplete: Ember.computed('samples.[]', function() {
    return this.get('samples').isEvery('isFull', true);
  }),

  hasUniqueSampleNames: Ember.computed('samples.[]', function() {
    const numSamples = this.get('fastqFilePairs.length');
    const numUniqueNames = this.get('samples').uniqBy('sampleName').get('length');
    return numSamples === numUniqueNames;
  }),

  hasUnnamedSamples: Ember.computed('samples.[]', function() {
    return this.get('samples').any((sample) => {
      return sample.get('sampleName') == null;
    });
  }),

  cwlObjectValue: Ember.computed('samples.[]', function() {
    return this.get('samples').mapBy('cwlObjectValue');
  }),

  ddsFiles: Ember.computed('samples.[]', function() {
    return this.get('samples').mapBy('ddsFiles').reduce((a,b) => a.concat(b), []);
  }),
  addFileItem(fileItem) {
    // Check if we have an incomplete sample to add to
    let sample = this.get('samples').filterBy('isFull', false).get('lastObject');
    // If we don't have one, create a new sample
    if(Ember.isEmpty(sample)) {
      sample = FASTQSample.create({
        size: this.get('filesPerSample'),
        enforceUniqueness: this.get('enforceUniqueness')
      });
      this.get('samples').pushObject(sample);
    }
    sample.addFileItem(fileItem);
    return fileItem;
  },
  includesFileItem() {
    Ember.Logger.log('includesFileItem() not yet implemented');
  },
  removeFileItem() {
    Ember.Logger.log('removeFileItem() not yet implemented');
  },
  fastqFilePairs: Ember.computed('samples.[]', function() {
    Ember.Logger.log('fastqFilePairs not yet implemented');
  }),
  fileItemGroups: Ember.computed('samples.[]', function() {
    Ember.Logger.log('fileItemGroups not yet implemented');
  }),
  inputFiles: Ember.computed('samples.[]', function() {
    return this.get('samples').mapBy('inputFiles').reduce((a,b) => a.concat(b), []);
  })
});

export { FASTQFileItemList, extractSampleName, splitMultipleSeparators };
