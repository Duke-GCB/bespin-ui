import Ember from 'ember';
import FileGroupRow from 'bespin-ui/components/questionnaire/file-group-row';

const FASTQFilePairRow = FileGroupRow.extend({
  classNames: ['fastq-file-pair-row', 'well','well-sm'],
  pairName: Ember.computed.oneWay('pair.name'),
  errors: Ember.computed('pair.file1', 'pair.file2', 'pair.name', function() {
    const errors = [];
    const file1 = this.get('pair.file1');
    const file2 = this.get('pair.file2');
    const name = this.get('pair.name');
    let message = '';
    // If no files are chosen, indicate this is automatic
    if(Ember.isEmpty(file1) || Ember.isEmpty(file2)) {
      message = 'Select two files to detect sample name.';
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
