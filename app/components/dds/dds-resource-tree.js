import Ember from 'ember';

const DDSResourceTree = Ember.Component.extend({
  tagName: 'span',
  classNames: ['dds-resource-tree'],
  project: null,
  selectedResources: null,
  expanded: false,
  children: null,
  onPick: () => {},
  store: Ember.inject.service('store'),
  formatSettings: null,
  fetchedOnce: Ember.computed('children', function () {
    return this.get('children') != null;
  }),
  fetchChildren() {
    if(this.get('resource.isFile')) {
      // Don't do anything if a file
      return;
    }
    this.get('store').query('dds-resource', {
      folder_id: this.get('resource.id')
    }).then((children) => {
      this.set('children', children.sortBy('name'));
    });
  },
  didToggleExpanded: Ember.observer('expanded', function() {
    if(!this.get('fetchedOnce')) {
      this.fetchChildren();
    }
  }),
  expand(){
    this.toggleProperty('expanded');
  },
  pick() {
    this.get('onPick')(this.get('resource'));
  },
  actions: {
    clicked() {
      if(this.get('resource.isFile')) {
        this.pick();
      } else {
        this.expand();
      }
    },
  }
});

DDSResourceTree.reopenClass({
  positionalParams: ['project', 'resource', 'selectedResources', 'onPick']
});

export default DDSResourceTree;
