import { computed } from '@ember/object';
import Component from '@ember/component';

const JobDetail = Component.extend({
  tagName: 'div',
  classNames: ['job-detail','panel'],
  classNameBindings: 'panelType',
  panelType: computed('job.isErrored', function() {
    if(this.get('job.isErrored')) {
      return 'panel-danger';
    } else {
      return 'panel-default';
    }
  }),
  job: null
});

JobDetail.reopenClass({
  positionalParams: ['job']
});

export default JobDetail;
