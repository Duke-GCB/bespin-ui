import Ember from 'ember';

const JobFileStageGroupDetail = Ember.Component.extend({
  stageGroup: null,
  ddsFiles: Ember.computed('stageGroup.ddsFiles', function() {
    return this.get('stageGroup.ddsFiles').sortBy('sequenceGroup', 'sequence')
  }),
  urlFiles: Ember.computed('stageGroup.urlFiles', function() {
    return this.get('stageGroup.urlFiles').sortBy('sequenceGroup', 'sequence')
  })
});

JobFileStageGroupDetail.reopenClass({
  positionalParams: ['stageGroup']
});

export default JobFileStageGroupDetail;
