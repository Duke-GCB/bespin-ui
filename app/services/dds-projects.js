import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  projects() {
    return this.get('store').findAll('dds-project').then(projects => {
      return Ember.RSVP.resolve(projects.sortBy('name'));
    });
  }
});
