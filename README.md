# Bespin-UI

An [ember.js](http://emberjs.com/) application frontend for [bespin-api](https://github.com/Duke-GCB/bespin-api).

[![Build Status](https://travis-ci.org/Duke-GCB/bespin-ui.svg?branch=master)](https://travis-ci.org/Duke-GCB/bespin-ui)

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

#### Release Process

To create a release from master and tag it:

1. Fetch the latest master
2. Increment the version number in `package.json` and `package-json.lock`
3. Commit the changes to master
4. Tag the latest commit
5. Push master and tags to GitHub.

### Automated Releases

[npm version](https://docs.npmjs.com/cli/version) automates the above release process, relying on [Travis-CI](https://travis-ci.org/Duke-GCB/bespin-ui) . We've defined `preversion` and `postversion` scripts in `package.json`, so that publishing a release is done with one command

```
npm version patch
```

You can also use `major` or `minor` for different version increments, or customize the commit message with `-m`

###  Deployment Details

Our [bespin-web ansible role](https://github.com/Duke-GCB/gcb-ansible-roles/blob/master/bespin_web/tasks/run-server.yml#L22) creates a docker container from [bespin-webapp-docker](https://github.com/Duke-GCB/bespin-webapp-docker), with a specified release of bespin-ui.

For each release, [Travis-CI](https://travis-ci.org/Duke-GCB/bespin-ui) creates release builds and uploads them to the tag's GitHub release ([.travis.yml](.travis.yml)). One build, `bespin-ui-prod.tar.gz` is produced with the prod `JOB_WATCHER_URL`, and the other, `bespin-ui-dev.tar.gz` is produced with the dev `JOB_WATCHER_URL`. Both are optimized, minified [production](https://ember-cli.com/user-guide/#deployments) builds that are ready to be served. The [bespin-webapp-docker](https://github.com/Duke-GCB/bespin-webapp-docker) container serves these files with Apache.

For a different `JOB_WATCHER_URL`, create a manual build (see [build-release.sh](build-release.sh) for examples).
