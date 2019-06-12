import Ember from 'ember';

export default Ember.Mixin.create({
  model(){
    return this.get('store').findAll('workflow', { reload: true }).then(
      workflows => workflows.filterBy('isActive').sortBy('name')
    );
  }
});
