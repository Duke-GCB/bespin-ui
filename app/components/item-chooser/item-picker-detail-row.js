import { alias } from '@ember/object/computed';
import Component from '@ember/component';

const ItemPickerDetailRow = Component.extend({
  title: alias('item.displayName'),
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
