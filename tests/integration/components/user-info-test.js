import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | user info', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders user info', async function(assert) {
    this.set('user', EmberObject.create({
      firstName: 'Justin',
      lastName: 'Bailey',
      username: 'samus'
    }));

    await render(hbs`{{user-info user}}`);
    assert.equal(this.$().text().trim(), 'Justin Bailey (samus)');
  });
});
