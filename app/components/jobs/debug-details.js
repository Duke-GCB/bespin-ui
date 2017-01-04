import Ember from 'ember';

const DebugDetails = Ember.Component.extend({
});

DebugDetails.reopenClass({
  positionalParams: ['job']
});

export default DebugDetails;
