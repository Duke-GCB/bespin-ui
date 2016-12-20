import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPISerializer.extend({
  keyForRelationship: function(key /*, relationship */) {
    let underscored = Ember.String.underscore(key);
    return underscored;
  }
});
