import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  tag: DS.attr('string'),
  versions: DS.hasMany('workflow-version'),
  state: DS.attr('string'),
  latestVersion: Ember.computed('versions.[]', function() {
    return this.get('versions.lastObject');
  }),
  isActive: Ember.computed.equal('state', 'A')
});
