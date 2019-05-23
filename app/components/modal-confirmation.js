import Component from '@ember/component';

export default Component.extend({
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

