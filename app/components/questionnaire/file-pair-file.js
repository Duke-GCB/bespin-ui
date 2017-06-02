import Ember from 'ember';

const FilePairFile = Ember.Component.extend({
  file: null,
  tagName: 'li',
  classNames: ['file-pair-file'],
  index: 0,
  onClick: () => {},
  actions: {
    resourceClicked() {
      // Here we must send the index back of the component, so we know which file item to remove
      this.get('onClick')(this.get('index'));
    },
  }
});

FilePairFile.reopenClass({
  positionalParams: ['file', 'index', 'onClick']
});

export default FilePairFile;
