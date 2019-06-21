import { computed } from '@ember/object';
import Component from '@ember/component';

const JobFileStageGroupDetail = Component.extend({
  stageGroup: null,
  ddsFiles: computed('stageGroup.ddsFiles', function() {
    return this.get('stageGroup.ddsFiles').sortBy('sequenceGroup', 'sequence')
  }),
  urlFiles: computed('stageGroup.urlFiles', function() {
    return this.get('stageGroup.urlFiles').sortBy('sequenceGroup', 'sequence')
  })
});

JobFileStageGroupDetail.reopenClass({
  positionalParams: ['stageGroup']
});

export default JobFileStageGroupDetail;
