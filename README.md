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

### Building

* `ember build` (development)
* `JOB_WATCHER_URL="wss://bespin-ws.gcb.duke.edu" ember build --environment production` (production) (see `build-release.sh`)

### Deploying

This application is built and bundled with [bespin-api](https://github.com/Duke-GCB/bespin-api) in [https://github.com/Duke-GCB/bespin-webapp-docker](Duke-GCB/bespin-webapp-docker)

When a tag is pushed, [Travis-CI](https://travis-ci.org/Duke-GCB/bespin-ui) will create a production build and upload it as `bespin-ui.tar.gz` to the GitHub release corresponding to the tag, as described in [.travis.yml](.travis.yml). Travis also triggers the Docker Hub build of bespin-webapp-docker.

To create a release from master and tag it:

1. Fetch the latest master
2. Increment the version number in `package.json` and `package-json.lock`
3. Commit the changes to master
4. Tag the latest commit
5. Push master and tags to GitHub, triggering the Travis CI build and Docker build

[npm version](https://docs.npmjs.com/cli/version) can automate this process. By defining `preversion` and `postversion` scripts in `package.json`, publishing a release is done with one command

```
npm version patch
```

You can also use `major` or `minor` for different version increments, or customize the commit message with `-m`
