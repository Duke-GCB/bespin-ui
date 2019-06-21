import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | share group contact', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders share group name and email', async function(assert) {
    const shareGroup = EmberObject.create({
      name: 'Share Group',
      email: 'sharegroup@example.com'
    });
    this.set('shareGroup', shareGroup);

    await render(hbs`{{share-group-contact}}`);
    assert.equal(this.$().text().trim(), '');

    await render(hbs`{{share-group-contact shareGroup}}`);
    assert.equal(this.$().text().trim(), 'Share Group');
    assert.equal(this.$('a.share-group-contact').attr('href'), 'mailto:sharegroup@example.com');
  });
});
