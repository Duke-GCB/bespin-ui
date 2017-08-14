import Ember from 'ember';

const DDSResourceTree = Ember.Component.extend({
  tagName: 'span',
  classNames: ['dds-resource-tree'],
  selectedResources: null,
  expanded: false,
  children: null,
  onPick: () => {},
  store: Ember.inject.service('store'),
  hasFiles: Ember.computed('children', function() {
    const children = this.get('children');
    if(children == null) {
      return false;
    }
    return children.filterBy('isFile').get('length') > 0;
  }),
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
      this.set('fetchedOnce', true);
    });
  },
  didToggleExpanded: Ember.observer('expanded', function() {
    if(!this.get('fetchedOnce')) {
      this.fetchChildren();
    }
  }),
  expand(){
    this.set('expanded', !this.get('expanded'));
  },
  pick() {
    this.get('onPick')(this.get('resource'));
  },
  pickAllFiles() {
    let files = this.get('children').filterBy('isFile');
    let onPick = this.get('onPick');
    files.forEach(onPick);
  },

  actions: {
    resourceClicked() {
      if(this.get('resource.isFile')) {
        this.pick();
      } else {
        this.expand();
      }
    },
    pickAllFilesClicked() {
      this.pickAllFiles();
    }
  }
});

DDSResourceTree.reopenClass({
  positionalParams: ['resource', 'selectedResources', 'onPick']
});

export default DDSResourceTree;
