import Ember from 'ember';
import FASTQFilePairList from './fastq-file-pair-list';

export default FASTQFilePairList.extend({
  // Just overriding the 'answer' method to return an array of files
  answer: Ember.computed('fieldName', 'fileItems.cwlObjectValue.[]', function() {
    const fieldName = this.get('fieldName');
    // Convert NamedFASTQFilePairType to a FASTQReadPairType
    const fastqReadPairs = this.get('fileItems.cwlObjectValue').map(namedPair => {
      return Ember.Object.create({
        name: namedPair.get('name'),
        read1_files: [namedPair.get('file1')],
        read2_files: [namedPair.get('file2')]
      });
    });

    const answer = Ember.Object.create();
    answer.set(fieldName, fastqReadPairs);
    return answer;
  }),
});
