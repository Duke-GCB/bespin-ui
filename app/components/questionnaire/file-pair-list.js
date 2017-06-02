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
  selectedResources: Ember.computed.alias('filePairArray.allFiles.[]'),
  filePairArray: null,
  filePairs: Ember.computed.alias('filePairArray.pairs'),
  actions: {
    addFile(file) {
      this.get('filePairArray').addFile(file);
    },
    provide() {
      this.get('provideAnswer')(this.get('fieldName'), this.get('pickedFiles'));
    }
  },
  init(){
    this._super(...arguments);
    if(Ember.isEmpty(this.get('filePairArray'))) {
      this.set('filePairArray', FilePairArray.create());
    }
  }
});

FilePairList.reopenClass({
  positionalParams: ['fieldName','provideAnswer']
});

export default FilePairList;
