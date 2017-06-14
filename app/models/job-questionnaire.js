import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  workflowVersion: DS.belongsTo('workflow-version'),
  systemJobOrderJson: DS.attr('string'), // This is JSON
  systemJobOrder: Ember.computed('systemJobOrderJson', function() {
    return JSON.parse(this.get('systemJobOrderJson'));
  }),
  userFieldsJson: DS.attr('string'), // This is JSON
  vmFlavor: DS.belongsTo('vm-flavor'),
  vmProject: DS.belongsTo('vm-project'),
  userFieldsArray: Ember.computed('userFieldsJson', function() {
    return JSON.parse(this.get('userFieldsJson'));
  })
});
