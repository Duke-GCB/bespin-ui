import Ember from 'ember';

const JobControls = Ember.Component.extend({
  classNames: ['btn-group', 'btn-group-justified'],
  tagName: 'div',
  job: null,
  actions: {
    start() {
      const operation = 'started';
      this.get('job').start();
    },
    cancel() {
      const operation = 'cancelled';
      this.get('job').cancel();
    },
    restart() {
      const operation = 'restarted';
      this.get('job').restart();
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
