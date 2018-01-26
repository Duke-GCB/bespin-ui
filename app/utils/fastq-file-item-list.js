import Ember from 'ember';

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

const FASTQSample = Ember.Object.extend({
  fileItems: null,
  size: 2,
  enforceUniqueness: true,
  generateSampleNames: true, // true = class should try to generate sample name when full
  _sampleName: null, // private variable to support auto-generating sample name when not set by user
  _userSetSampleName: false, // true = sample name has been set directly from calling code
  userSetSampleName: Ember.computed.oneWay('_userSetSampleName'), // read-only version of the above
  init() {
    this._super(...arguments);
    if(Ember.isEmpty(this.get('fileItems'))) {
      this.set('fileItems', []);
    }
  },
  _generateSampleName() {
    const extractedSampleNames = this.get('fileItems').mapBy('name').map((name) => extractSampleName(name));
    const uniqueSampleNames = extractedSampleNames.uniq();
    if(uniqueSampleNames.get('length') == 1) {
      return uniqueSampleNames.objectAt(0);
    } else {
      return null;
    }
  },
  _shouldGenerateSampleName: Ember.computed('_userSetSampleName', 'generateSampleNames', 'isFull', function() {
    if(  this.get('generateSampleNames') === false // Generation disabled
      || this.get('_userSetSampleName') === true // Already set externally
      || this.get('isFull') === false) { // Not full yet, so don't try
      return false;
    } else {
      return true;
    }
  }),
  // Sample name may be generated from file names or supplied by user
  sampleName: Ember.computed('_sampleName', '_shouldGenerateSampleName', {
    get(/* key */) {
      if(this.get('_shouldGenerateSampleName')) {
        const sampleName = this._generateSampleName();
        this.set('_sampleName', sampleName);
      }
      return this.get('_sampleName');
    },
    set(key, value) {
      // when setting externally, prevent generating
      this.set('_userSetSampleName', true);
      this.set('_sampleName', value);
      return value;
    }
  }),
  isFull: Ember.computed('fileItems.length', 'size', function() {
    return this.get('fileItems.length') === this.get('size');
  }),
  isEmpty: Ember.computed('fileItems.length', function() {
    return this.get('fileItems.length') === 0;
  }),
  ddsFiles: Ember.computed.mapBy('fileItems', 'ddsFile'),
  fileItemsLength: Ember.computed.alias('fileItems.length'),
  inputFiles: Ember.computed.mapBy('fileItems', 'inputFile'),
  includesFileItem(fileItem) {
    return this.indexOfFileItem(fileItem) != -1;
  },

  indexOfFileItem(fileItem) {
    // Check inclusion based on the ddsFile property by default
    // If the fileItem does not have this property, fallback to object equality
    const ddsFile = Ember.get(fileItem, 'ddsFile');
    if(ddsFile) {
      return this.get('ddsFiles').indexOf(ddsFile);
    } else {
      return this.get('fileItems').indexOf(fileItem);
    }
  },

  addFileItem(fileItem) {
    if(!this.get('isFull')) {
      this.get('fileItems').pushObject(fileItem);
      return fileItem;
    } else {
      return false;
    }
  },

  removeFileItem(fileItem) {
    const index = this.indexOfFileItem(fileItem);
    if(index < 0) {
      return false;
    }
    this.get('fileItems').removeAt(index);
    return index;
  },

  removeFromIndex(index) {
    this.set('fileItems', this.get('fileItems').slice(0, index));
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

  isComplete: Ember.computed('samples.@each.isFull', function() {
    return this.get('samples').isEvery('isFull', true);
  }),

  hasUniqueSampleNames: Ember.computed('samples.length', 'samples.@each.sampleName', function() {
    const numSamples = this.get('samples.length');
    const numUniqueNames = this.get('samples').uniqBy('sampleName').get('length');
    return numSamples === numUniqueNames;
  }),

  hasUnnamedSamples: Ember.computed('samples.@each.sampleName', function() {
    const sampleNames = this.get('samples').mapBy('sampleName');
    return sampleNames.any((sampleName) => Ember.isEmpty(sampleName));
  }),

  cwlObjectValue: Ember.computed('samples.@each.cwlObjectValue', function() {
    return this.get('samples').mapBy('cwlObjectValue');
  }),

  // Ideally this would compute on something based on samples.[].fileItems.[]
  // But Ember cannot do computed properties with 2 levels of nesting.
  ddsFiles: Ember.computed('samples.[]', 'samples.@each.fileItemsLength', function() {
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
  includesFileItem(fileItem) {
    return this.get('samples').any((sample) => sample.includesFileItem(fileItem));
  },
  removeFromIndex(index) {
    this.set('samples', this.get('samples').slice(0, index));
  },
  removeEmptySamples() {
    this.set('samples', this.get('samples').filterBy('isEmpty', false));
  },

  removeFileItem(sampleIndex, fileItemIndex) {
    // Prepare to remove. Since this is an array of arrays, we need to re-number
    const sample = this.get('samples').objectAt(sampleIndex);
    const fileItem = sample.get('fileItems').objectAt(fileItemIndex);

    if(!sample.includesFileItem(fileItem)) {
      return false;
    }

    let leftovers = sample.get('fileItems').slice(fileItemIndex + 1);
    leftovers = leftovers.concat(this.get('samples').slice(sampleIndex + 1).mapBy('fileItems').reduce((a,b) => a.concat(b), []));

    // OK, now delete the file Item from the sample
    sample.removeFromIndex(fileItemIndex);
    // And clear out the rest of the samples
    this.removeFromIndex(sampleIndex + 1);
    // If the sample is empty, delete it.
    this.removeEmptySamples();

    leftovers.forEach((leftoverFileItem) => {
      this.addFileItem(leftoverFileItem);
    });
    return true;
  },
  inputFiles: Ember.computed('samples.[]', 'samples.@each.fileItemsLength', function() {
    return this.get('samples').mapBy('inputFiles').reduce((a,b) => a.concat(b), []);
  })
});

export { FASTQFileItemList, extractSampleName, splitMultipleSeparators };
