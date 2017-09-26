import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  workflowVersion: DS.belongsTo('workflow-version'),
  content: DS.attr('string'),
  contents: Ember.computed.alias('content'),
});
