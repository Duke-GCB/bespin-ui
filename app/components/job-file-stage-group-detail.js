import Ember from 'ember';

const JobFileStageGroupDetail = Ember.Component.extend({
  stageGroup: null,
  ddsFiles: Ember.computed.alias('stageGroup.ddsFiles'),
  urlFiles: Ember.computed.alias('stageGroup.urlFiles')
});

JobFileStageGroupDetail.reopenClass({
  positionalParams: ['stageGroup']
});

export default JobFileStageGroupDetail;
