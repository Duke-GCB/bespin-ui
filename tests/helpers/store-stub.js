import Ember from 'ember';

export default Ember.Service.extend({
  reset() {
    this.set('findCalls', []);
    this.set('queryCalls', []);
    this.set('createCalls', []);
  },
  findCalls: [],
  queryCalls: [],
  createCalls: [],
  findCount: Ember.computed('findCalls.length', function() { return this.get('findCalls.length'); }),
  queryCount: Ember.computed('queryCalls.length', function() { return this.get('queryCalls.length'); }),
  createCount: Ember.computed('createCalls.length', function() { return this.get('createCalls.length'); }),

  // Functions that generate mock objects
  findAllFunction(modelName) {
    let object = Ember.Object.create({id:'abc-123', kind: modelName});
    return [object];
  },

  queryFunction(modelName, params) {
    let object = Ember.Object.create(params);
    object.set('kind', modelName);
    object.set('id', 'def-456');
    return [object];
  },

  createFunction(modelName, params) {
    let object = Ember.Object.create(params);
    return object;
  },

  // Mocked store methods
  findAll(modelName) {
    // For projects!
    this.get('findCalls').pushObject(modelName);
    let results = this.findAllFunction(modelName);
    return new Ember.RSVP.Promise(function (resolve) {
      // returns one
      resolve(results);
    });
  },
  query(modelName, params) {
    this.get('queryCalls').pushObject({modelName: modelName, params: params});
    let results = this.queryFunction(modelName, params);
    return new Ember.RSVP.Promise(function(resolve) {
      resolve(results);
    });
  },
  createRecord(modelName, params) {
    this.get('createCalls').pushObject({modelName: modelName, params: params});
    return this.createFunction(modelName, params);
  }
});
