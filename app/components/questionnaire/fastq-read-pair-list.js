import { htmlSafe } from '@ember/template';
import EmberObject, { computed } from '@ember/object';
import FASTQFilePairList from './fastq-file-pair-list';

export default FASTQFilePairList.extend({
  // Primary purpose of this subclass is to provide a different structure from the 'answer'
  // method that returns single files wrapped in an array.
  answer: computed('fieldName', 'fileItems.cwlObjectValue.[]', function() {
    const fieldName = this.get('fieldName');
    // Convert NamedFASTQFilePairType to a FASTQReadPairType
    const fastqReadPairs = this.get('fileItems.cwlObjectValue').map(namedPair => {
      return EmberObject.create({
        name: namedPair.get('name'),
        read1_files: [namedPair.get('file1')],
        read2_files: [namedPair.get('file2')]
      });
    });

    const answer = EmberObject.create();
    answer.set(fieldName, fastqReadPairs);
    return answer;
  }),
  // Support Message
  featureSupportMessage: htmlSafe('<strong>Note:</strong> This workflow supports multiple file pairs per read. ' +
    'However, the web interface only supports choosing one file pair per read. If you wish to run this workflow with multiple files per ' +
    'read, please use <a href="https://github.com/Duke-GCB/bespin-cli">bespin-cli</a>.'),
});
