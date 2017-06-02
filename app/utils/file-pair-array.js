import Ember from 'ember';
import FilePair from './file-pair';

export default Ember.Object.extend({
  pairs: null,
  length: Ember.computed.alias('pairs.length'),
  lastPair: Ember.computed.alias('pairs.lastObject'),
  allFiles: Ember.computed('pairs.@each.file1', 'pairs.@each.file2', function() {
    // Computed off each.file1 and each.file2, since we can't observe more keys after the each.
    // i.e. pairs.@each.files.[] does not work
    Ember.Logger.log('recalculating allFiles');
    let pairs = this.get('pairs');
    return pairs.map(pair => { return pair.get('files'); }).reduce((prev, item) => {
      return prev.concat(item);
    }, []);
  }),
  init() {
    this.set('pairs', []);
    this._super(...arguments);
  },
  addFile(file) {
    // First check if we need to create another pair
    let pairs = this.get('pairs');
    let pair = pairs.get('lastObject');
    if(!pair || pair.get('isFull')) {
      pair = FilePair.create();
      pairs.pushObject(pair);
    }
    return pair.addFile(file);
  },
  removePair(pair) {
    return this.get('pairs').removeObject(pair);
  }
});
