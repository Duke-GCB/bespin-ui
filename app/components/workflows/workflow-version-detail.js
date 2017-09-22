import Ember from 'ember';

export default Ember.Component.extend({
  workflowVersion: null,
  title: Ember.computed('workflowVersion.version', function() {
    return `Version ${this.get('workflowVersion.version')}`;
  })
});
