import Ember from 'ember';
import FileGroupRow from 'bespin-ui/components/questionnaire/file-group-row';

const FASTQFilePairRow = FileGroupRow.extend({
  pairName: Ember.computed.alias('pair.name'),
});

FASTQFilePairRow.reopenClass({
  positionalParams: ['pair', 'groupIndex', 'onClick']
});

export default FASTQFilePairRow;
