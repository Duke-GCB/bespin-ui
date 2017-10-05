import Ember from 'ember';

export default Ember.Component.extend({
  workflow: null,
  onlyShowCurrent: false,
  sortedVersions: Ember.computed('onlyShowCurrent', 'workflow.versions[]', function() {
    const versions = this.get('workflow.versions').sortBy('version').reverse();
    if (this.get('onlyShowCurrent')) {
      return versions.slice(0, 1);
    }
    return versions;
  })
});
