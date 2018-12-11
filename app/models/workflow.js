import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  versions: DS.hasMany('workflow-version'),
  latestEnabledVersion: Ember.computed('versions.[]', function() {
    return this.get('versions').get('lastObject');
  }),
});
