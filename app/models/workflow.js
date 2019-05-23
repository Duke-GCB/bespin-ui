import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  tag: DS.attr('string'),
  versions: DS.hasMany('workflow-version'),
  latestVersion: computed('versions.[]', function() {
    return this.get('versions.lastObject');
  })
});
