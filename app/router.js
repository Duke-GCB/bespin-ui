import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('projects');
  this.route('login');
  this.route('workflows', function() {
    this.route('show', { path: '/:workflow_id'});
    this.route('versions', { path: '/:workflow_id/versions'}, function() {
      this.route('show', { path: '/:workflow_version_id'});
    });
  });
  this.route('jobs', function() {
    this.route('new', function() {
      this.route('select-workflow');
      this.route('select-questionnaire', {
        path: '/select-questionnaire/:workflow_version_id'
      });
      this.route('build-answer-set', {
        path: '/build-answer-set/:questionnaire_id'
      });
      this.route('select-workflow-version', {
        path: '/select-workflow-version/:workflow_id'
      });
    });
    this.route('show', {
      path: '/:job_id'
    });
    this.route('readme', {
      path: '/:job_id/readme'
    });
  });
  this.route('dds-job-input-file');
});

export default Router;
