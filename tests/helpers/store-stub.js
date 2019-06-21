import { Promise } from 'rsvp';
import EmberObject, { computed } from '@ember/object';
import Service from '@ember/service';

export default Service.extend({
  reset() {
    this.set('findCalls', []);
    this.set('queryCalls', []);
    this.set('createCalls', []);
  },
  findCalls: null,
  queryCalls: null,
  createCalls: null,
  findCount: computed('findCalls.length', function() { return this.get('findCalls.length'); }),
  queryCount: computed('queryCalls.length', function() { return this.get('queryCalls.length'); }),
  createCount: computed('createCalls.length', function() { return this.get('createCalls.length'); }),

  init() {
    this.reset();
    this._super(...arguments);
  },

  // Functions that generate mock objects
  findAllFunction(modelName) {
    let object = EmberObject.create({id:'abc-123', kind: modelName});
    return [object];
  },

  queryFunction(modelName, params) {
    let object = EmberObject.create(params);
    object.set('kind', modelName);
    object.set('id', 'def-456');
    return [object];
  },

  createFunction(modelName, params) {
    let object = EmberObject.create(params);
    object.set('__model_kind', modelName);
    return object;
  },

  // Mocked store methods
  findAll(modelName) {
    // For projects!
    this.get('findCalls').pushObject(modelName);
    let results = this.findAllFunction(modelName);
    return new Promise(function (resolve) {
      // returns one
      resolve(results);
    });
  },
  query(modelName, params) {
    this.get('queryCalls').pushObject({modelName: modelName, params: params});
    let results = this.queryFunction(modelName, params);
    return new Promise(function(resolve) {
      resolve(results);
    });
  },
  createRecord(modelName, params) {
    this.get('createCalls').pushObject({modelName: modelName, params: params});
    return this.createFunction(modelName, params);
  }
});
