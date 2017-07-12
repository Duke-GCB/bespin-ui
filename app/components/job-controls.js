import Ember from 'ember';

const JobControls = Ember.Component.extend({
  job: null,
  error: null,
  // The operation is set on success or failure since it is part of the state.
  operation: null,
  errorTitle: Ember.computed('operation', function() {
    return `The job could not be ${this.get('operation')}:`;
  }),
  actions: {
    start() {
      const operation = 'started';
      this.get('job').start().then(this.success.bind(this, operation), this.failure.bind(this, operation));
    },
    cancel() {
      const operation = 'cancelled';
      this.get('job').cancel().then(this.success.bind(this, operation), this.failure.bind(this, operation));
    },
    restart() {
      const operation = 'restarted';
      this.get('job').restart().then(this.success.bind(this, operation), this.failure.bind(this, operation));
    }
  },
  failure(operation, error) {
    this.set('error', error);
    this.set('operation', operation);
  },
  success(operation) {
    this.set('error', null);
    this.set('operation', operation);
  },
  buttons: Ember.computed('job.state', function() {
    let state = this.get('job.state');
    let buttons = [
      {type: 'primary', action: 'start', title: 'Start', enabled: false},
      {type: 'danger', action: 'cancel', title: 'Cancel', enabled: false},
      {type: 'default', action: 'restart', title: 'Restart', enabled: false},
    ];

    let actionToEnable = null;
    if(state === 'A' ) { // New
      actionToEnable = 'start';
    } else if(state === 'R') { // Running
      actionToEnable = 'cancel';
    } else if(state === 'C' || state === 'E') { // Canceled, Error
      actionToEnable = 'restart';
    } else {
      // 'F'inished or transitional states have no actions.
    }
    let buttonToEnable = buttons.findBy('action', actionToEnable);
    if(buttonToEnable) {
      buttonToEnable.enabled = true;
    }
    return buttons;
  })
});

JobControls.reopenClass({
  positionalParams: ['job']
});

export default JobControls;
