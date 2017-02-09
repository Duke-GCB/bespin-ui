import Ember from 'ember';

const JobStates = {
  N: 'New',
  R: 'Running',
  F: 'Finished',
  E: 'Error',
  C: 'Canceled'
};

export function decodeJobState(state) {
  if(JobStates.hasOwnProperty(state)) {
    return JobStates[state];
  } else {
    return state;
  }
}

export default Ember.Helper.helper(decodeJobState);
