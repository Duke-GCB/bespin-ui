import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForQueryRecord(query, modelName) {
    /*
    From https://emberjs.com/api/ember-data/2.16.0/classes/DS.Store/methods/queryRecord?anchor=queryRecord

    > queryRecord makes a request for one record, where the id is not known beforehand
    > (if the id is known, use findRecord instead).

    Initially tried findRecord, passing 'current-user' as the ID. But this causes Ember Data to raise warnings
    about the id 'current-user' not matching the record's id returned in the payload.

    So instead, they recommend using queryRecord, and we can simply override urlForQueryRecord
    */
    return this.buildURL(modelName, 'current-user');
  }
});
