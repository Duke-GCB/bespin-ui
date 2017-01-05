import Ember from 'ember';

export default Ember.Service.extend({
  steps: ['select-workflow', 'select-input-files'],
  step: 0,
  init() {
    this._super(...arguments);
    this.set('router', Ember.getOwner(this).lookup('router:main'));
    this.set('errors', []);
    Ember.Logger.log('init in the wizard service!');
  },
  next() {
    const step = this.get('step');
    const route = `jobs.new.${this.get('steps')[this.get('step')]}`;
    this.set('step', step + 1);
    Ember.Logger.log(route);
    this.get('router').transitionTo(route);
  }
});
