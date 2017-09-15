import Ember from 'ember';

const JobOncompletionDetail = Ember.Component.extend({
  shareGroup: null,
  email: null
});

JobOncompletionDetail.reopenClass({
  positionalParams: ['shareGroup', 'email']
});

export default JobOncompletionDetail;

