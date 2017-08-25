import Ember from 'ember';

const ItemPickerDetailRow = Ember.Component.extend({
  titleKey: null,
  title: Ember.computed('item.displayName' ,function() {
    return this.get('item.displayName');
  }),
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
