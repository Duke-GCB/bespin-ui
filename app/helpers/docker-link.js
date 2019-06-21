import { helper as buildHelper } from '@ember/component/helper';

function makeDockerLink(dockerImageName) {
  const matches = dockerImageName.match('(([^:/]*)/)?([^:/]*)/([^:/]*)(:(.*))?');
  if (matches) {
    let host = matches[2];
    let repoSeparator = 'r';
    if (!host || host === 'docker.io') {
      host = 'hub.docker.com';
    } else if (host === 'quay.io') {
      repoSeparator = 'repository';
    }
    const org = matches[3];
    const repo = matches[4];
    return `https://${host}/${repoSeparator}/${org}/${repo}`;
  } else {
    return null;
  }
}

export function dockerLink(params) {
  if (params && params.length > 0 && params[0]) {
    return makeDockerLink(params[0]);
  } else {
    return null;
  }
}

export default buildHelper(dockerLink);
