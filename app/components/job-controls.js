import Ember from 'ember';

const JobControls = Ember.Component.extend({
  error: null,
  message: null,
  actions: {
    start() {
      this.get('job').start().then(this.success.bind(this), this.failure.bind(this));
    },
    cancel() {
      this.get('job').cancel().then(this.success.bind(this), this.failure.bind(this));
    },
    restart() {
      this.get('job').restart().then(this.success.bind(this), this.failure.bind(this));
    }
  },
  failure(error) {
    this.set('error', error);
    this.set('message', null);
  },
  success(result) {
    this.set('error', null);
    this.set('message', result);
  },
  buttons: Ember.computed('job.state', function() {
    let state = this.get('job.state');
    let buttons = [
      {type: 'primary', action: 'start', title: 'Start', enabled: false},
      {type: 'danger', action: 'cancel', title: 'Cancel', enabled: false},
      {type: 'default', action: 'restart', title: 'Restart', enabled: false},
    ];

    let actionToEnable = null;
    if(state === 'N' ) { // New
      actionToEnable = 'start';
    } else if(state === 'R') { // Running
      actionToEnable = 'cancel';
    } else if(state === 'F' || state === 'C' || state == 'E') { // Finished, Canceled, Error
      actionToEnable = 'restart'
    }
    buttons.findBy('action', actionToEnable).enabled = true;
    return buttons;
  })
});

JobControls.reopenClass({
  positionalParams: ['job']
});

export default JobControls;
