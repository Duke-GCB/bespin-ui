import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  workflowVersion: DS.belongsTo('workflow-version'),
  name: DS.attr('string'),
  created: DS.attr('date'),
  state: DS.attr('string'),
  step: DS.attr('string'),
  lastUpdated: DS.attr('date'),
  vmFlavor: DS.attr('string'),
  vmInstanceName: DS.attr('string'),
  vmProjectName: DS.attr('string'),
  jobOrder: DS.attr('string'), // This is JSON, no need to test it
  stageGroup: DS.belongsTo('job-file-stage-group'),
  isNew: Ember.computed('state', function() {
    return this.get('state') === 'N';
  }),
  isAuthorized: Ember.computed('state', function() {
    return this.get('state') === 'A';
  }),
  isFinished: Ember.computed('state', function() {
    return this.get('state') === 'F';
  }),
  outputDir: DS.belongsTo('job-output-dir'),
  // Named jobErrors because DS.Model already has an errors property (contains validation error messages)
  jobErrors: DS.hasMany('job-error'),
  updateAfterAction(data) {
    // The action methods respond with an updated job, so we must update the local store
    // with that payload. Remember, pushPayload doesn't return.
    this.store.pushPayload('job', data);
    return Ember.RSVP.resolve(this.store.peekRecord(this.constructor.modelName, this.get('id')));
  },

  start() {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.start(this.get('id')).then(this.updateAfterAction.bind(this));
  },
  cancel() {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.cancel(this.get('id')).then(this.updateAfterAction.bind(this));
  },
  restart() {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.restart(this.get('id')).then(this.updateAfterAction.bind(this));
  },
  authorize(token) {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.authorize(this.get('id'), token).then(this.updateAfterAction.bind(this));
  }
});
