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
  shareGroup: DS.belongsTo('share-group'),
  runToken: DS.attr('string'),
  isNew: Ember.computed('state', function() {
    return this.get('state') === 'N';
  }),
  isAuthorized: Ember.computed('state', function() {
    return this.get('state') === 'A';
  }),
  // Distinct from isAuthorized - indicates whether a job needs authorization to proceed
  hasAuthorization: Ember.computed.not('isNew'),
  isStarting: Ember.computed('state', function() {
    return this.get('state') === 'S';
  }),
  isRestarting: Ember.computed('state', function() {
    return this.get('state') === 'r';
  }),
  isRunning: Ember.computed('state', function() {
    return this.get('state') === 'R';
  }),
  isFinished: Ember.computed('state', function() {
    return this.get('state') === 'F';
  }),
  isErrored:  Ember.computed('state', function() {
    return this.get('state') === 'E';
  }),
  isCanceling: Ember.computed('state', function() {
    return this.get('state') === 'c';
  }),
  isCanceled: Ember.computed('state', function() {
    return this.get('state') === 'C';
  }),
  isDeletable: Ember.computed('state', function() {
    const deletableStates = ['N','A','F','E','C'];
    return deletableStates.includes(this.get('state'));
  }),
  outputProject: DS.belongsTo('job-dds-output-project'),
  // Named jobErrors because DS.Model already has an errors property (contains validation error messages)
  jobErrors: DS.hasMany('job-error'),
  lastJobError: Ember.computed('jobErrors.[]', function() {
    return this.get('jobErrors').sortBy('created').get('lastObject');
  }),
  usage: DS.attr(),
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
    // authorize endpoint I/O assumes a job-tokens structure
    // since non-admin users do not have access to GET a job-token we provide only the "token" value
    let jobTokens = {
      "job-tokens": {
        "token": token
      }
    };
    return adapter.authorizeJob(this.get('id'), jobTokens).then((data) => {
      // in addition to token information the response includes the job that was updated
      // refresh this job
      this.updateAfterAction({
        "jobs": data['job-tokens']['job']
      });
    });
  }
});
