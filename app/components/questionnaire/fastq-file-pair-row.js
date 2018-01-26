import Ember from 'ember';
import FileGroupRow from 'bespin-ui/components/questionnaire/file-group-row';

const FASTQFilePairRow = FileGroupRow.extend({
  classNames: ['fastq-file-pair-row', 'well','well-sm'],
  pairName: Ember.computed.alias('pair.sampleName'),
  errors: Ember.computed('pair.isFull', 'pairName', 'size', function() {
    const errors = [];
    const isFull = this.get('pair.isFull');
    const name = this.get('pairName');
    const size = this.get('pair.size');
    let message = '';
    if(isFull === false) {
      message = `Select ${size} files to detect sample name.`;
    } else if(Ember.isEmpty(name)) {
      // If files are chosen, indicate the automatic naming failed
      message = 'No sample name could be detected. Please enter a sample name.';
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
