import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | token detail row', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders three columns', async function(assert) {
    this.set('token', EmberObject.create(
      {
        id: 'SecretValue123',
        created: 'SOMEDATE'
      }));
    await render(hbs`{{token-detail-row token}}`);

    assert.equal(this.$('td').length, 3);
    assert.equal(this.$('td :first .sensitive-value-span').text(), 'Secret********',
      'First column should display the first few characters then asterisks initially');
    assert.equal(this.$('td').eq(1).text(), 'SOMEDATE', 'Second column should display the created date');
    assert.equal(this.$('td').eq(2).text(), 'Delete', 'Third column should show a delete button');

    run(() => this.$('td :first .sensitive-value-show-button').click());
    assert.equal(this.$('td :first .sensitive-value-span').text(), 'SecretValue123',
      'First column should display the whole token once show button is clicked');
  });

  test('runs onDeleteToken action when user clicks Delete', async function(assert) {
    assert.expect(1);
    this.set('token', EmberObject.create(
      {
        id: 'SecretValue123',
        created: 'SOMEDATE'
      }));
    this.set('externalAction', (token) => {
      assert.equal(token.id, 'SecretValue123');
    });
    await render(hbs`{{token-detail-row token onDeleteToken=(action externalAction)}}`);
    run(() => this.$('.deleteToken-button').click());
  });
});
