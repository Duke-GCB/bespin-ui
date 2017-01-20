import Ember from 'ember';

const ItemChooser = Ember.Component.extend({
  title: '',
  itemTitleKey: '',
  selectedItem: null,
  items: [],
  onChoose() {},
  onCancel() {},
  actions: {
    next() {
      this.get('onChoose')(this.get('selectedItem'));
    },
    cancel() {
      this.get('onCancel')();
    },
    selectionChanged(item) {
      this.set('selectedItem', item);
    }
  }
});

ItemChooser.reopenClass({
  positionalParams: ['items', 'onChoose', 'onCancel']
});

export default ItemChooser;
