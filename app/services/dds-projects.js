import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  projects: [],
  init() {
    this._super(...arguments);
    this.get('store').findAll('dds-project').then(projects => {
      this.set('projects', projects);
    });
  }
});
