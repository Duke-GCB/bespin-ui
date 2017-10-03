import Ember from 'ember';

const JobError = Ember.Component.extend({
  tagName: 'div',
  classNames: ['job-error'],
  jobError: null,
  collapsed: true,
  notCollapsed: Ember.computed.not('collapsed'),
  toggleCollapse() {
    this.toggleProperty('collapsed');
  }
});

JobError.reopenClass({
  positionalParams: ['jobError']
});

export default JobError;
