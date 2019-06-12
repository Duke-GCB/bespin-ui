import Ember from 'ember';

export default Ember.Mixin.create({
  model(){
    // reload is set to true to skip cached workflows to handle the scenario where the cache is not fully populated
    // with all active workflows.
    return this.get('store').findAll('workflow', { reload: true }).then(
      workflows => workflows.filterBy('isActive').sortBy('name')
    );
  }
});
