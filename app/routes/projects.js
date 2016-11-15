import Ember from 'ember';

let projects = [{id: 1, name: 'My Project'}, {id: 2, name:'Your Project'}];

export default Ember.Route.extend({
  model(){ return projects; }
});
