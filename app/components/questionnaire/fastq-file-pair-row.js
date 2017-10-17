import Ember from 'ember';
import FileGroupRow from 'bespin-ui/components/questionnaire/file-group-row';

export default FileGroupRow.extend({
  groupName: Ember.computed.alias('group.name'),
});
