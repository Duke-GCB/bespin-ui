import Ember from 'ember';

const JobFileStageGroupDetail = Ember.Component.extend({
  stageGroup: null,
  ddsFiles: Ember.computed('stageGroup.ddsFiles', function() {
    return this.get('stageGroup.ddsFiles').sortBy('id')
  }),
  urlFiles: Ember.computed.alias('stageGroup.urlFiles')
});

JobFileStageGroupDetail.reopenClass({
  positionalParams: ['stageGroup']
});

export default JobFileStageGroupDetail;
