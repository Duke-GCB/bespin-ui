import { computed, observer } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

const DDSResourceTree = Component.extend({
  tagName: 'span',
  classNames: ['dds-resource-tree'],
  project: null,
  selectedResources: null,
  expanded: false,
  children: null,
  onPick: () => {},
  store: service('store'),
  formatSettings: null,
  fetchedOnce: computed('children', function () {
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
  didToggleExpanded: observer('expanded', function() {
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
