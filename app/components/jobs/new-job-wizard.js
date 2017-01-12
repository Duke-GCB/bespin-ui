import Ember from 'ember';

const stepRoutes = ['jobs.new.select-workflow','jobs.new.select-input-files'];

const NewJobWizard = Ember.Component.extend({
  router: null,
  step: 0,
  errors: [],
  stepToRoute(step) {
    return stepRoutes[step];
  },
  routeToStep(route) {
    let step = stepRoutes.indexOf(route);
    step = Math.min(stepRoutes.length - 1, step);
    step = Math.max(0, step);
    return step;
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
    this.updateStep();
  },
  routerPathChanged: Ember.observer('router.currentPath', function() {
    this.updateStep();
  }),
  stepChanged: Ember.on('init', Ember.observer('step', function() {
    this.get('router').transitionTo(this.get('desiredRoute'));
  })),
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
  positionalParams: ['router']
});

export default NewJobWizard;
