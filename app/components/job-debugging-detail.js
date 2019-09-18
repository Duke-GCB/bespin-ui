import Ember from 'ember';

const JobDebuggingDetail = Ember.Component.extend({
  job: null,
  isSettingUp: Ember.computed('job.state', function() {
    return ["sshdebugsetup", "debugsetup"].includes(this.get('job.state'));
  }),
  isSSHMode: Ember.computed('job.state', function() {
    return ["sshdebugsetup", "sshdebug"].includes(this.get('job.state'));
  })
});

JobDebuggingDetail.reopenClass({
  positionalParams: ['job']
});

export default JobDebuggingDetail;
