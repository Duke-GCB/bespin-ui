import { observer } from '@ember/object';
import { on } from '@ember/object/evented';
import Component from '@ember/component';

const JobState = Component.extend({
  classNames: ['job-state', 'dl-horizontal'],
  tagName: 'dl',
  job: null,
  liveCpuHours: null,
  liveVmHours: null,
  fetchLiveUsage: on('init', observer('job.lastUpdated', function() {
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
