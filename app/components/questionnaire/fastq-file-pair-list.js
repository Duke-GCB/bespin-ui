import Ember from 'ember';
import FileGroupList from 'bespin-ui/components/questionnaire/file-group-list';
import { FASTQFileItemList }from 'bespin-ui/utils/fastq-file-item-list';

const FASTQFilePairList = FileGroupList.extend({
  groupSize: 2,
  answerFormErrors: null,
  fieldErrors: Ember.computed('answerFormErrors.[]', 'fieldName', function() {
    Ember.Logger.log('field errors!');
    return this.get('answerFormErrors').get('errors').filterBy('field', this.get('fieldName'));
  }),
  fastqFilePairs: Ember.computed.alias('fileItems.fastqFilePairs'),
  validityDidChange: Ember.on('init', Ember.observer('fastqFilePairs.length','fastqFilePairs.isComplete', function() {
    Ember.Logger.log('validity did change!');
    const answerFormErrors = this.get('answerFormErrors');
    const fieldName = this.get('fieldName');
    const pairCount = this.get('fastqFilePairs.length');
    if(pairCount < 1) {
      Ember.Logger.log('less than one pair');
      answerFormErrors.setError(fieldName, 'Please choose at least 1 sample pair');
    } else if(!this.get('fastqFilePairs.isComplete')) {
      // This test is failing
      Ember.Logger.log('things are not full');
      answerFormErrors.setError(fieldName, 'Please ensure all samples are paired')
    } else {
      // TODO: Check uniqueness
      answerFormErrors.clearError(fieldName);
    }
  })),

  // Override init to user our customized FileItemList type
  init() {
    if(Ember.isEmpty(this.get('fileItems'))) {
      this.set('fileItems', FASTQFileItemList.create());
    }
    // Call this._super AFTER setting fileItems. Otherwise the base class sets it
    return this._super(...arguments);
  }
});

export default FASTQFilePairList;
