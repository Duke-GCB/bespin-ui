import Ember from 'ember';

const FilePairRow = Ember.Component.extend({
  filePair: null
});

FilePairRow.reopenClass({
  positionalParams: ['filePair']
});

export default FilePairRow;
