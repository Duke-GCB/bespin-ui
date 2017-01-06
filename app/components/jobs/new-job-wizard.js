import Ember from 'ember';

const stepRoutes = ['jobs.new.select-workflow','jobs.new.select-input-files'];

const NewJobWizard = Ember.Component.extend({
  step: 0, // So that next() forwards to step 0
  stepToRoute(step) {
    return stepRoutes[step];
  },
  routeToStep(route) {
    return stepRoutes.indexOf(route);
  },
  desiredRoute: Ember.computed('step', function() {
    return this.stepToRoute(this.get('step'));
  }),
  updateStep() {
    const route = this.get('router').currentPath;
    this.set('step', this.routeToStep(route));
  },
  init() {
    this._super(...arguments);
    this.set('router', Ember.getOwner(this).lookup('router:main'));
    this.set('errors', []);
    this.get('router').addObserver('currentPath', () => { this.updateStep(); });
    this.updateStep();
  },
  stepChanged: Ember.observer('step', function() {
    this.get('router').transitionTo(this.get('desiredRoute'));
  }),
  actions: {
    next() {
      this.set('step', this.get('step') + 1);
    },
    prev() {
      this.set('step', this.get('step') - 1);
    }
  }
});

NewJobWizard.reopenClass({
  positionalParams: ['job','workflows']
});

export default NewJobWizard;
