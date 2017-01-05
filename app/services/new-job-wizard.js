import Ember from 'ember';

export default Ember.Service.extend({
  steps: ['select-workflow', 'select-input-files'],
  step: -1, // So that next() forwards to step 0
  currentRoute: Ember.computed('step', 'steps', function() {
    return `jobs.new.${this.get('steps')[this.get('step')]}`;
  }),
  init() {
    this._super(...arguments);
    this.set('router', Ember.getOwner(this).lookup('router:main'));
    this.set('errors', []);
  },
  stepChanged: Ember.observer('step', function() {
    this.get('router').transitionTo(this.get('currentRoute'));
  }),
  next() {
    this.set('step', this.get('step') + 1);
  },
  prev() {
    this.set('step', this.get('step') - 1);
  }
});
