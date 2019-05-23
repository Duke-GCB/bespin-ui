import { helper as buildHelper } from '@ember/component/helper';

const JobSteps = {
  V: 'Create VM',
  S: 'Staging In',
  R: 'Running Workflow',
  O: 'Store Job Output',
  T: 'Terminate VM',
};

export function decodeJobStep(step) {
  if(JobSteps.hasOwnProperty(step)) {
    return JobSteps[step];
  } else {
    return step;
  }
}

export default buildHelper(decodeJobStep);
