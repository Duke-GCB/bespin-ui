import Ember from 'ember';

export default Ember.Service.extend({
  callCount: 0,
  modelsCalled: [],
  findAll(modelName) {
    // For projects!
    this.get('modelsCalled').push(modelName);
    this.set('callCount', this.get('callCount') + 1);
    return new Ember.RSVP.Promise(function (resolve) {
      resolve([{id:'abc-123', kind: modelName}]);
    });
  }
});
