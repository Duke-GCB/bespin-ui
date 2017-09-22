import Ember from 'ember';

const JobDetailTitle = Ember.Component.extend({
  job: null,
});

JobDetailTitle.reopenClass({
  positionalParams: ['job']
});

export default JobDetailTitle;

