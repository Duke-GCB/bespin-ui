import Ember from 'ember';

const FilePairFile = Ember.Component.extend({
  file: null
});

FilePairFile.reopenClass({
  positionalParams: ['file']
});

export default FilePairFile;
