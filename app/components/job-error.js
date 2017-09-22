import Ember from 'ember';

const JobErrors = Ember.Component.extend({
  jobError: null,
  collapsed: true,
  notCollapsed: Ember.computed.not('collapsed'),
  toggleCollapse() {
    this.toggleProperty('collapsed');
  }
});

JobErrors.reopenClass({
  positionalParams: ['jobError']
});

export default JobErrors;
