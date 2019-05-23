import Component from '@ember/component';

const JobDetailTitle = Component.extend({
  job: null,
});

JobDetailTitle.reopenClass({
  positionalParams: ['job']
});

export default JobDetailTitle;

