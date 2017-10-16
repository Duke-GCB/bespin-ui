import Ember from 'ember';

export default Ember.Component.extend({
  onConfirm: () => {},
  title: 'Confirm',
  openButtonTitle: 'Open',
  body: 'Please confirm the action.',
  confirmButtonTitle: 'Confirm',
  modalConfirmationOpen: false,
  openButtonType: 'danger',
  confirmButtonType: 'danger',
  actions: {
    confirm() {
      this.get('onConfirm')();
      this.set('modalConfirmationOpen', false);
    }
  }
});

