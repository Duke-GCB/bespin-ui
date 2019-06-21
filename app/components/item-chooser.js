import Component from '@ember/component';

const ItemChooser = Component.extend({
  title: '',
  selectedItem: null,
  items: null,
  onNext() {},
  onBack() {},
  actions: {
    next() {
      this.get('onNext')(this.get('selectedItem'));
    },
    back() {
      this.get('onBack')();
    },
    selectionChanged(item) {
      this.set('selectedItem', item);
    }
  },
});

ItemChooser.reopenClass({
  positionalParams: ['items', 'onNext', 'onBack']
});

export default ItemChooser;
