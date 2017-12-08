import Ember from 'ember';

const JobFileStageGroupDetail = Ember.Component.extend({
  stageGroup: null,
  ddsFiles: Ember.computed('stageGroup.ddsFiles', function() {
    return this.get('stageGroup.ddsFiles').sortBy('sequence')
  }),
  urlFiles: Ember.computed('stageGroup.urlFiles', function() {
    return this.get('stageGroup.urlFiles').sortBy('sequence')
  })
});

JobFileStageGroupDetail.reopenClass({
  positionalParams: ['stageGroup']
});

export default JobFileStageGroupDetail;
