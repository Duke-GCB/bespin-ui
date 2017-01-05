import Ember from 'ember';

const NewJobWizard = Ember.Component.extend({
  wizard: Ember.inject.service('new-job-wizard'),
  init() {
    this._super(...arguments);
    this.get('wizard').next();
  },
});

NewJobWizard.reopenClass({
  positionalParams: ['job','workflows']
});

export default NewJobWizard;
