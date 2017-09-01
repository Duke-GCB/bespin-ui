import Ember from 'ember';

const ItemPickerDetailRow = Ember.Component.extend({
  title: Ember.computed.alias('item.displayName'),
  actions: {
    pick() {
      this.get('onPick')(this.get('item'));
    },
  }
});

ItemPickerDetailRow.reopenClass({
  positionalParams: ['item', 'selectedItem', 'onPick']
});

export default ItemPickerDetailRow;
