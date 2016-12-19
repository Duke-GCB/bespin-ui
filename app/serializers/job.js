import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForRelationship: function(key, relationship) {
    let dasherized = Ember.String.underscore(key);
    console.log(`key: ${key} -> path: ${dasherized}`);
    return dasherized;
  }
});
