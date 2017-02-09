import Ember from 'ember';

const WorkflowVersionsList = Ember.Component.extend({
});

WorkflowVersionsList.reopenClass({
  positionalParams: ['versions']
});

export default WorkflowVersionsList;
