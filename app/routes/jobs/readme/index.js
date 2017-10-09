import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    console.log(params);
    return params;
    //return this.get('store').findRecord('job', params.job_id);
  }
});
