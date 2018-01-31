import Ember from 'ember';
import FileGroupRow from 'bespin-ui/components/questionnaire/file-group-row';

const FASTQFilePairRow = FileGroupRow.extend({
  classNames: ['fastq-file-pair-row', 'well','well-sm'],
  pairName: Ember.computed.alias('pair.sampleName'),
  errors: Ember.computed('pair.isFull', 'pairName', 'pair.size', 'pair.userSetSampleName', function() {
    const errors = [];
    const isFull = this.get('pair.isFull');
    const name = this.get('pairName');
    const size = this.get('pair.size');
    const userSetSampleName = this.get('pair.userSetSampleName');
    let message = '';

    if(userSetSampleName === false && isFull === false) {
      message = `Please select ${size} files to detect sample name.`;
    } else if(userSetSampleName === true && isFull === false) {
      message = `Please select ${size} files.`;
    } else if(userSetSampleName === false && Ember.isEmpty(name)) {
      // If files are chosen, indicate the automatic naming failed
      message = 'No sample name could be detected. Please enter a sample name.';
    } else if(userSetSampleName === true && Ember.isEmpty(name)) {
      // If files are chosen, indicate the automatic naming failed
      message = 'Please enter a sample name.';
    }
    if(message) {
      errors.addObject(Ember.Object.create({message: message}));
    }
    return errors;
  })
});

FASTQFilePairRow.reopenClass({
  positionalParams: ['pair', 'groupIndex', 'onClick']
});

export default FASTQFilePairRow;
