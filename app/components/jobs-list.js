import Ember from 'ember';

const JobsListComponent = Ember.Component.extend({
  tagName: 'table',
  classNames: ['table','table-striped']
});

JobsListComponent.reopenClass({
  positionalParams: ['jobs']
});

export default JobsListComponent;
