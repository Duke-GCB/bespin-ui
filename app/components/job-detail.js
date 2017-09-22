import Ember from 'ember';

const JobDetail = Ember.Component.extend({
  tagName: 'div',
  classNames: ['panel'],
  classNameBindings: 'panelType',
  panelType: Ember.computed('job.isErrored', function() {
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
