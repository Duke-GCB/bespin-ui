import Ember from 'ember';

const DebugDetails = Ember.Component.extend({
  job: null,
  pickedFiles: null
});

DebugDetails.reopenClass({
  positionalParams: ['job', 'pickedFiles']
});

export default DebugDetails;
