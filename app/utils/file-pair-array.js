import Ember from 'ember';
import FilePair from './file-pair';

export default Ember.Object.extend({
  pairs: null,
  length: Ember.computed.alias('pairs.length'),
  lastPair: Ember.computed.alias('pairs.lastObject'),
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
  }
});
