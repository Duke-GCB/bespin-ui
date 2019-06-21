import { resolve } from 'rsvp';
import { not } from '@ember/object/computed';
import { computed } from '@ember/object';
import DS from 'ember-data';

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
  isNew: computed('state', function() {
    return this.get('state') === 'N';
  }),
  isAuthorized: computed('state', function() {
    return this.get('state') === 'A';
  }),
  // Distinct from isAuthorized - indicates whether a job needs authorization to proceed
  hasAuthorization: not('isNew'),
  isStarting: computed('state', function() {
    return this.get('state') === 'S';
  }),
  isRestarting: computed('state', function() {
    return this.get('state') === 'r';
  }),
  isRunning: computed('state', function() {
    return this.get('state') === 'R';
  }),
  isFinished: computed('state', function() {
    return this.get('state') === 'F';
  }),
  isErrored:  computed('state', function() {
    return this.get('state') === 'E';
  }),
  isCanceling: computed('state', function() {
    return this.get('state') === 'c';
  }),
  isCanceled: computed('state', function() {
    return this.get('state') === 'C';
  }),
  isDeletable: computed('state', function() {
    const deletableStates = ['N','A','F','E','C'];
    return deletableStates.includes(this.get('state'));
  }),
  outputProject: DS.belongsTo('job-dds-output-project'),
  // Named jobErrors because DS.Model already has an errors property (contains validation error messages)
  jobErrors: DS.hasMany('job-error'),
  lastJobError: computed('jobErrors.[]', function() {
    return this.get('jobErrors').sortBy('created').get('lastObject');
  }),
  usage: DS.attr('job-usage'),
  updateAfterAction(data) {
    // The action methods respond with an updated job, so we must update the local store
    // with that payload. Remember, pushPayload doesn't return.
    this.store.pushPayload('job', data);
    return resolve(this.store.peekRecord(this.constructor.modelName, this.get('id')));
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
  getLiveUsage() {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.getLiveUsage(this.get('id'));
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
