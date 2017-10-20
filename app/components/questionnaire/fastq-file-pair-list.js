import Ember from 'ember';
import FileGroupList from 'bespin-ui/components/questionnaire/file-group-list';
import { FASTQFileItemList }from 'bespin-ui/utils/fastq-file-item-list';

const FASTQFilePairList = FileGroupList.extend({
  groupSize: 2,
  fastqFilePairs: Ember.computed.alias('fileItems.fastqFilePairs'),
  // Override init to user our customized FileItemList type
  init() {
    if(Ember.isEmpty(this.get('fileItems'))) {
      this.set('fileItems', FASTQFileItemList.create());
    }
    // Call this._super AFTER setting fileItems. Otherwise the base class sets it
    return this._super(...arguments);
  },
  actions: {
    click() {
      Ember.Logger.log(JSON.stringify(this.get('fileItems.cwlObjectValue'), null, 2));
    }
  }

});

export default FASTQFilePairList;
