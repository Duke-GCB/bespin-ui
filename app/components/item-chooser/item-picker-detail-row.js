import Ember from 'ember';

const ItemPickerDetailRow = Ember.Component.extend({
  titleKey: 'name',
  title: Ember.computed('item', 'titleKey' ,function() {
    var item = this.get('item');
    var titleKey = this.get('titleKey');
    if(item) {
      return item.get(titleKey);
    } else {
      return null;
    }
  }),
  actions: {
    pick() {
      this.get('onPick')(this.get('item'));
    },
  }
});

ItemPickerDetailRow.reopenClass({
  positionalParams: ['item', 'selectedItem', 'onPick', 'titleKey']
});

export default ItemPickerDetailRow;
