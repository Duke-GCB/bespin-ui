import Ember from 'ember';
import FilePairArray from 'bespin-ui/utils/file-pair-array';

const FilePairList = Ember.Component.extend({
  /**
   * Encapsulates a file picker and a grouping/pairing control
   */
  fieldName: null,
  provideAnswer: null,
  ddsProjects: Ember.inject.service(),
  projects: Ember.computed.alias('ddsProjects.projects'),
  filePairArray: null,
  filePairs: Ember.computed.alias('filePairArray.pairs'),
  actions: {
    addFile(file) {
      Ember.Logger.log(`add file ${file.get('name')}`);
      // Now add the file to the end of the list
      // Now I have the data structures for the file pairs, need to create components on the right side that render those.
    },
    provide() {
      Ember.Logger.log('provide');
      this.get('provideAnswer')(this.get('fieldName'), this.get('pickedFiles'));
    }
  },
  init(){
    this._super(...arguments);
  }
});

FilePairList.reopenClass({
  positionalParams: ['fieldName','provideAnswer']
});

export default FilePairList;
