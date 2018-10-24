# Bespin-UI

An [ember.js](http://emberjs.com/) application frontend for [bespin-api](https://github.com/Duke-GCB/bespin-api).

[![CircleCI](https://circleci.com/gh/Duke-GCB/bespin-ui.svg?style=svg)](https://circleci.com/gh/Duke-GCB/bespin-ui)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone git@github.com:Duke-GCB/bespin-ui.git` this repository
* `cd bespin-ui`
* `npm install`

## Running / Development

* Check the Bespin API endpoint configured in config/environment.js
* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Manual Builds

* `ember build` (Local Development)
* `JOB_WATCHER_URL="wss://bespin-ws.gcb.duke.edu" ember build --environment production` (production) (see below)

### Automated Releases

The [`npm version`](https://docs.npmjs.com/cli/version) command triggers the automated release process using [Travis-CI](https://travis-ci.org/Duke-GCB/bespin-ui) and GitHub. `npm version` takes care of creating a git tag using semantic versioning. It runs the `preversion` and `postversion` scripts specified in  [`package.json`](package.json) before and after tagging the new version. These scripts ensure that releases happen from a clean and current `master` branch, passes tests, and pushes the resulting tag to GitHub. When the new tag is pushed, [Travis-CI](https://travis-ci.org/Duke-GCB/bespin-ui) builds releases for it and uploads them back to [GitHub](https://github.com/duke-gcb/bespin-ui/releases) as **Downloads**.

The following command is all that's needed to produce a release:

```
npm version patch
```

You can also use `major` or `minor` for different version increments, or customize the commit message with `-m`

###  Deployment Details

Our [bespin-web ansible role](https://github.com/Duke-GCB/gcb-ansible-roles/blob/master/bespin_web/tasks/run-server.yml#L22) creates a docker container from [bespin-webapp-docker](https://github.com/Duke-GCB/bespin-webapp-docker), with a specified release of bespin-ui.

For each release, [Travis-CI](https://travis-ci.org/Duke-GCB/bespin-ui) creates release builds and uploads them to the tag's GitHub release ([.travis.yml](.travis.yml)). One build, `bespin-ui-prod.tar.gz` is produced with the prod `JOB_WATCHER_URL`, and the other, `bespin-ui-dev.tar.gz` is produced with the dev `JOB_WATCHER_URL`. Both are optimized, minified [production](https://ember-cli.com/user-guide/#deployments) builds that are ready to be served. The [bespin-webapp-docker](https://github.com/Duke-GCB/bespin-webapp-docker) container serves these files with Apache.

For a different `JOB_WATCHER_URL`, create a manual build (see [build-release.sh](build-release.sh) for examples).
