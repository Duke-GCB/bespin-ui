import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  versions: DS.hasMany('workflow-version'),
  latestVersion: Ember.computed('versions.[]', function() {
    return this.get('versions.lastObject');
  }),
  enabledVersions: Ember.computed.filterBy('versions', 'enableUi', true),
  latestEnabledVersion: Ember.computed('enabledVersions.[]', function() {
    return this.get('enabledVersions.lastObject');
  }),
});
