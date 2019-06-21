import Component from '@ember/component';

const JobName = Component.extend({
  classNames: ['row', 'job-name']
});

JobName.reopenClass({
  positionalParams: ['answerSet']
});

export default JobName;
