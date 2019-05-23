import { alias } from '@ember/object/computed';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  workflowVersion: DS.belongsTo('workflow-version'),
  systemJobOrderJson: DS.attr('json-object'), // This is JSON
  userFieldsJson: DS.attr('json-array'), // This is a JSON Array
  vmFlavor: DS.belongsTo('vm-flavor'),
  vmProject: DS.belongsTo('vm-project'),
  displayName: alias('name')
});
