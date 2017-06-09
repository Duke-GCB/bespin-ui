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
    this.route('show', {
      path: '/:workflow_id'
    });
  });
  this.route('workflows');
  this.route('jobs', function() {
    this.route('new', function() {
      this.route('select-workflow');
      this.route('select-questionnaire', {
        path: '/select-questionnaire/:workflow_version_id'
      });
      this.route('build-answer-set', {
        path: '/build-answer-set/:questionnaire_id'
      });
    });
    this.route('show', {
      path: '/:job_id'
    });
  });
  this.route('file-picking-test', {
    path: 'file-picking-test/:folder_id'
  });
});

export default Router;
