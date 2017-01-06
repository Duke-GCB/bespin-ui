import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      job: this.get('store').createRecord('job'),
      workflows: this.get('store').findAll('workflow'),
    });
  }
});
