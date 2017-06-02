import Ember from 'ember';

const FilePairRow = Ember.Component.extend({
  pairIndex: 0,
  displayIndex: Ember.computed('pairIndex', function() {
    return this.get('pairIndex') + 1;
  }),
  classNames: ['file-pair-row', 'well','well-sm'],
  filePair: null,
  actions: {
    removeFile: function(index) {
      this.get('filePair').removeAt(index);
    }
  }
});

FilePairRow.reopenClass({
  positionalParams: ['filePair', 'pairIndex']
});

export default FilePairRow;
