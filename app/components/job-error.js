import { not } from '@ember/object/computed';
import Component from '@ember/component';

const JobError = Component.extend({
  tagName: 'div',
  classNames: ['job-error'],
  jobError: null,
  collapsed: true,
  notCollapsed: not('collapsed'),
  toggleCollapse() {
    this.toggleProperty('collapsed');
  }
});

JobError.reopenClass({
  positionalParams: ['jobError']
});

export default JobError;
