import Ember from 'ember';

const JobStates = {
  N: 'New',
  A: 'Authorized',
  S: 'Starting',
  R: 'Running',
  F: 'Finished',
  E: 'Error',
  c: 'Canceling',
  C: 'Canceled',
  r: 'Restarting',
};

export function decodeJobState(state) {
  if(JobStates.hasOwnProperty(state)) {
    return JobStates[state];
  } else {
    return state;
  }
}

export default Ember.Helper.helper(decodeJobState);
