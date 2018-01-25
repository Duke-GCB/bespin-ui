import Ember from 'ember';
import FileGroupRow from 'bespin-ui/components/questionnaire/file-group-row';

const FASTQFilePairRow = FileGroupRow.extend({
  classNames: ['fastq-file-pair-row', 'well','well-sm'],
  pairName: Ember.computed.alias('pair.sampleName'),
  errors: Ember.computed('pair.isFull', 'pair.sampleName', function() {
    const errors = [];
    const files = this.get('pair.fileItems');
    const name = this.get('pairName');
    let message = '';
    // If no files are chosen, indicate this is automatic
    if(!(this.get('pair.isFull'))) {
      message = `Select ${this.get('pair.size')} files to detect sample name.`;
    } else if(Ember.isEmpty(name)) {
      // If files are chosen, indicate the automatic naming failed
      message = 'No sample name detected. File names must begin with a common name to detect sample name.';
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
