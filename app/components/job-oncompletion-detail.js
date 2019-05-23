import Component from '@ember/component';

const JobOncompletionDetail = Component.extend({
  tagName: 'div',
  classNames: ['job-oncompletion-detail'],
  shareGroup: null,
  email: null
});

JobOncompletionDetail.reopenClass({
  positionalParams: ['shareGroup', 'email']
});

export default JobOncompletionDetail;

