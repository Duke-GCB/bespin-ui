import Ember from 'ember';

const JobState = Ember.Component.extend({
  classNames: ['job-state', 'dl-horizontal'],
  tagName: 'dl',
  job: null,
  liveCpuHours: null,
  liveVmHours: null,
  fetchLiveUsage: Ember.on('init', Ember.observer('job', function() {
    const job = this.get('job');
    if (job) {
      job.getLiveUsage().then((liveUsage) => {
        this.setProperties({
          liveCpuHours: liveUsage.cpuHours,
          liveVmHours: liveUsage.vmHours,
        });
      });
    }
  }))
});

JobState.reopenClass({
  positionalParams: ['job']
});

export default JobState;
