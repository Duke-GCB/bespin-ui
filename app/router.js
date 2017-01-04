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
  this.route('workflow-versions');
  this.route('jobs', function() {
    this.route('new', function() {
      this.route('select-workflow');
      this.route('select-inputs');
      this.route('select-input-files');
    });
  });
});

export default Router;
