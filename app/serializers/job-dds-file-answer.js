import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  keyForRelationship(key, relationship) {
    Ember.Logger.log(`called keyForRelationship(${key}, ${Ember.inspect(relationship)}`);
    if (key == 'file') {
      return 'file_id';
    } else if(key == 'project') {
      return 'project_id';
    } else {
      return this._super(key, relationship);
    }
  },

});
