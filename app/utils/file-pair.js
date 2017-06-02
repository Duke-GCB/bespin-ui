import Ember from 'ember';

const OUT_OF_RANGE_EXCEPTION = 'Index out of range';

const FilePair = Ember.Object.extend({
  files: null,
  file1: Ember.computed('files.[]', function() {
    let files = this.get('files');
    if (files && files.length > 0) {
      return files[0];
    } else {
      return null;
    }
  }),
  file2: Ember.computed('files.[]', function() {
    let files = this.get('files');
    if (files && files.length > 1) {
      return files[1];
    } else {
      return null;
    }
  }),
  init() {
    this.set('files', []);
    this._super(...arguments);
  },
  length: Ember.computed.alias('files.length'),
  maxLength: 2,
  addFile(file) {
    if(this.get('isFull')) {
      throw new Ember.Error(OUT_OF_RANGE_EXCEPTION);
    } else {
      return this.get('files').pushObject(file);
    }
  },
  removeAt(index) {
    return this.get('files').removeAt(index);
  },
  isFull: Ember.computed('files.length', function() {
    return this.get('files.length') === this.get('maxLength');
  }),
  isEmpty: Ember.computed('files.length', function() {
    return this.get('files.length') === 0;
  })
});

export default FilePair;
