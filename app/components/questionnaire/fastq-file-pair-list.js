import Ember from 'ember';
import FileGroupList from 'bespin-ui/components/questionnaire/file-group-list';
import { FASTQFileItemList } from 'bespin-ui/utils/fastq-file-item-list';

const FASTQFilePairList = FileGroupList.extend({
  groupSize: 2,
  answerFormErrors: null,
  fieldErrors: Ember.computed('answerFormErrors.errors.[]', 'fieldName', function() {
    return this.get('answerFormErrors.errors').filterBy('field', this.get('fieldName'));
  }),
  samples: Ember.computed.alias('fileItems.samples'),
  validityDidChange: Ember.on('init', Ember.observer('answerFormErrors', 'fieldName','samples.length',
    'fileItems.isComplete', 'fileItems.hasUniqueSampleNames', 'fileItems.hasUnnamedSamples',
    'groupSize', function() {
    const answerFormErrors = this.get('answerFormErrors');
    if(!answerFormErrors) {
      // We have not answerFormErrors object, bail out
      return;
    }
    const fieldName = this.get('fieldName');
    const pairCount = this.get('samples.length');
    const groupSize = this.get('groupSize');
    if(pairCount < 1) {
      answerFormErrors.setError(fieldName, `No files chosen. Please choose at least ${groupSize} files.`);
    } else if(!this.get('fileItems.isComplete')) {
      answerFormErrors.setError(fieldName, `Some samples are incomplete. Please ensure all samples have ${groupSize} files.`)
    } else if(!this.get('fileItems.hasUniqueSampleNames')) {
      answerFormErrors.setError(fieldName, 'Some samples have duplicate names. Please edit the sample names to ensure each is unique.')
    } else if(this.get('fileItems.hasUnnamedSamples')) {
      answerFormErrors.setError(fieldName, 'Some samples have blank names. Please edit the sample names');
    } else {
      // All Good!
      answerFormErrors.clearError(fieldName);
    }
  })),

  // The base component, FileGroupList, sends an 'answerChanged' action when the user edits the list
  // by adding or removing a file. Since this component also supports editable sample names, we must
  // send an 'answerChanged' action when a sample name changes
  sampleNameDidChange: Ember.observer('samples.@each.sampleName', function() {
    this.sendAction('answerChanged', this);
  }),

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
