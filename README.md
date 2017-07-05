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

* See [https://github.com/Duke-GCB/bespin-webapp-docker](Duke-GCB/bespin-webapp-docker).
