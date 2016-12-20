import Ember from 'ember';

const JobsListComponent = Ember.Component.extend({
});

JobsListComponent.reopenClass({
  positionalParams: ['jobs']
});

export default JobsListComponent;
