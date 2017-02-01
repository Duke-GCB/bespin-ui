import Ember from 'ember';

const JobControls = Ember.Component.extend({
  actions: {
    start() {
      Ember.Logger.log('start');
    },
    cancel() {
      Ember.Logger.log('cancel');
    },
    restart() {
      Ember.Logger.log('restart');
    }
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
