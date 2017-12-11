import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modal-confirmation', 'Integration | Component | modal confirmation', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('title', 'Modal Title');
  this.set('openButtonTitle', 'Show');
  this.set('body', 'Modal Body');
  this.set('confirmButtonTitle', 'Delete');

  this.render(hbs`{{modal-confirmation
    title=title
    openButtonTitle=openButtonTitle
    body=body
    confirmButtonTitle=confirmButtonTitle
  }}`);

  assert.equal(this.$().html(), 'Modal Title');
  assert.equal(this.$('.modal-body').text().trim(), 'Modal Body');
  assert.equal(this.$('button.modal-confirmation-open').text().trim(), 'Show');
  assert.equal(this.$('button.modal-confirmation-confirm').text().trim(), 'Delete');
});

test('Clicking the open button shows the modal', function(assert) {
  this.render(hbs`{{modal-confirmation}}`);
  // We test that the modal is shown by the modal-backdrop class over the rest of the component
  assert.equal(this.$('.modal-backdrop').length, 0);
  this.$('button.modal-confirmation-open').click();
  assert.equal(this.$('.modal-backdrop').length, 1);
});

test('Clicking the confirm button calls the onConfirm', function(assert) {
  this.set('onConfirm', () => {
    assert.ok(true);
  });
  this.render(hbs`{{modal-confirmation onConfirm=onConfirm}}`);
  this.$('button.modal-confirmation-confirm').click();
});
