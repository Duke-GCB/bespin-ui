import { equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  tag: DS.attr('string'),
  versions: DS.hasMany('workflow-version'),
  state: DS.attr('string'),
  latestVersion: computed('versions.[]', function() {
    return this.get('versions.lastObject');
  }),
  isActive: equal('state', 'A')
});
