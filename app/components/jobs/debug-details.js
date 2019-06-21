import Component from '@ember/component';

const DebugDetails = Component.extend({
  job: null,
  pickedFiles: null
});

DebugDetails.reopenClass({
  positionalParams: ['job', 'pickedFiles']
});

export default DebugDetails;
