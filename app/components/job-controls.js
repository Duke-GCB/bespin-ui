import Ember from 'ember';

const JobControls = Ember.Component.extend({
  classNames: ['btn-group', 'btn-group-justified'],
  tagName: 'div',
  job: null,
  sshDebug: true,
  actions: {
    start() {
      this.get('job').start();
    },
    cancel() {
      this.get('job').cancel();
    },
    restart() {
      this.get('job').restart();
    },
    debug() {
      var sshDebug = this.get('sshDebug');
      if (this.get('sshDebug')) {
        this.set('job.state', 'sshdebugsetup');
        Ember.run.later(() => this.set('job.state', 'sshdebug'), 3000);
      } else {
        this.set('job.state', 'debugsetup');
        Ember.run.later(() => this.set('job.state', 'debug'), 3000);
      }
      this.set('sshDebug', !sshDebug)
    },
    cancelDebug() {
      this.set('job.state', 'E');
    }
  },
  buttons: Ember.computed('job.state', function() {
    let state = this.get('job.state');
    let buttons = [];
    if (state === 'sshdebugsetup' || state == 'sshdebug' || state === 'debugsetup' || state == 'debug') {
      buttons.push({type: 'default', action: 'cancelDebug', title: 'Cancel Debug', enabled: true});
    } else {
      buttons = [
        {type: 'primary', action: 'start', title: 'Start', enabled: false},
        {type: 'danger', action: 'cancel', title: 'Cancel', enabled: false},
        {type: 'default', action: 'restart', title: 'Restart', enabled: false},
      ];
    }
    if (state === 'E') {
      var sshDebug = this.get('sshDebug');
      var debugTitle = "Debug web";
      if (sshDebug) {
        debugTitle = "Debug ssh";
      }
      buttons.push({type: 'default', action: 'debug', title: debugTitle, enabled: true});
    }

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
