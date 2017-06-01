import Ember from 'ember';

const FilePairRow = Ember.Component.extend({
  filePair: null,
  actions: {
    removeFile: function(index) {
      this.get('filePair').removeAt(index);
    }
  }
});

FilePairRow.reopenClass({
  positionalParams: ['filePair']
});

export default FilePairRow;
