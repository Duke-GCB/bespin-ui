# Bespin-UI

An [ember.js](http://emberjs.com/) application frontend for [bespin-api](https://github.com/Duke-GCB/bespin-api).

[![CircleCI](https://circleci.com/gh/Duke-GCB/bespin-ui.svg?style=svg)](https://circleci.com/gh/Duke-GCB/bespin-ui)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone git@github.com:Duke-GCB/bespin-ui.git` this repository
* `cd bespin-ui`
* `npm install`

## Running / Development

* Check the Bespin API endpoint configured in config/environment.js
* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

* `ember test`
* `ember test --server`

### Manual Builds

* `ember build` (Local Development)
* `JOB_WATCHER_URL="wss://bespin-ws.gcb.duke.edu" ember build --environment production` (production)

### Automated Releases

The [`npm version`](https://docs.npmjs.com/cli/version) command triggers the automated release process using [Travis-CI](https://travis-ci.org/Duke-GCB/bespin-ui) and GitHub. `npm version` takes care of creating a git tag using semantic versioning. It runs the `preversion` and `postversion` scripts specified in  [`package.json`](package.json) before and after tagging the new version. These scripts ensure that releases happen from a clean and current `master` branch, passes tests, and pushes the resulting tag to GitHub.

The following command is all that's needed to produce a release:

```
npm version patch
```

You can also use `major` or `minor` for different version increments, or customize the commit message with `-m`

###  Deployment Details

We use Docker and Ansible to deploy this application, as described in the [build_ember_app](https://github.com/Duke-GCB/gcb-ansible-roles/tree/master/build_ember_app) and [bespin_web](https://github.com/Duke-GCB/gcb-ansible-roles/tree/master/bespin_web) roles.

Production-ready archives are built on-demand as described by the [bespin.yml](https://github.com/Duke-GCB/gcb-ansible/blob/04484ed620dda86fecb37bedd476b9437d3233a7/bespin.yml#L44-L52) playbook

The [build_ember_app](https://github.com/Duke-GCB/gcb-ansible-roles/blob/master/build_ember_app/tasks/main.yml#L26) role produces a production built Ember application in a Docker volume, which is later attached to the [web server container](https://github.com/Duke-GCB/gcb-ansible-roles/blob/master/bespin_web/tasks/run-server.yml#L21)

The build configuration (release version and `JOB_WATCHER_URL`) are provided in variables to the `build_ember_app` role, allowing differing configurations for dev and prod.
