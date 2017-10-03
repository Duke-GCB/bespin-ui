import Ember from 'ember';

export default Ember.Component.extend({
  workflow: null,
  sortedVersions: Ember.computed('workflow.versions', function() {
    return this.get('workflow.versions').sortBy('version').reverse();
  })
});
