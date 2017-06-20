import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('jobs.new.select-workflow');
  }
});
