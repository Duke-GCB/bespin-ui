import Ember from 'ember';
import FileGroupList from 'bespin-ui/components/questionnaire/file-group-list';
import { FASTQFileItemList }from 'bespin-ui/utils/fastq-file-item-list';

const FASTQFilePairList = FileGroupList.extend({
  groupSize: 2,
  answerFormErrors: null,
  fieldErrors: Ember.computed('answerFormErrors.[]', 'fieldName', function() {
    return this.get('answerFormErrors').get('errors').filterBy('field', this.get('fieldName'));
  }),
  fastqFilePairs: Ember.computed.alias('fileItems.fastqFilePairs'),
  validityDidChange: Ember.on('init', Ember.observer('answerFormErrors', 'fastqFilePairs.length','fileItems.isComplete', function() {
    const answerFormErrors = this.get('answerFormErrors');
    if(!answerFormErrors) {
      // We have not answerFormErrors object, bail out
      return;
    }
    const fieldName = this.get('fieldName');
    const pairCount = this.get('fastqFilePairs.length');
    if(pairCount < 1) {
      answerFormErrors.setError(fieldName, 'Please choose at least 1 sample pair.');
    } else if(!this.get('fileItems.isComplete')) {
      answerFormErrors.setError(fieldName, 'Please ensure all samples are paired.')
    } else if(!this.get('fileItems.hasUniqueSampleNames')) {
      answerFormErrors.setError(fieldName, 'Please ensure all pairs chosen have unique names.')
    } else if(this.get('fileItems.hasUnnamedSamples')) {
      answerFormErrors.setError(fieldName, 'Unable to determine sample names for all pairs. ' +
        'Please ensure both files in a pair have a common name prefix (e.g. AB1234_R1.fastq.gz, AB1234_R2.fastq.gz. ' +
        'You may need to rename your files.');
    } else {
      // All Good!
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
