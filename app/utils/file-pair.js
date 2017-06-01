import Ember from 'ember';

const OUT_OF_RANGE_EXCEPTION = 'Index out of range';

const FilePair = Ember.Object.extend({
  files: null,
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
  removeFile(file) {
    return this.get('files').removeObject(file);
  },
  isFull: Ember.computed('files.length', function() {
    return this.get('files.length') === this.get('maxLength');
  })
});

export default FilePair;
