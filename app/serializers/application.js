import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
  _keyFor(key) {
    let underscored = Ember.String.underscore(key);
    return underscored;
  },
  keyForRelationship(key /*, relationship */) {
    return this._keyFor(key);
  },
  keyForAttribute(attr) {
    return this._keyFor(attr);
  },
  payloadKeyFromModelName(modelName) {
    return Ember.String.pluralize(modelName);
  }
});
