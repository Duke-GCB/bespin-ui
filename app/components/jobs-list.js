import Component from '@ember/component';

const JobsListComponent = Component.extend({
  tagName: 'table',
  classNames: ['table','table-striped']
});

JobsListComponent.reopenClass({
  positionalParams: ['jobs']
});

export default JobsListComponent;
