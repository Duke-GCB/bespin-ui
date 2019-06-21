import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import UserStub from '../../helpers/user-stub';

module('Integration | Component | job detail', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:user', UserStub);
  });

  test('it renders', async function(assert) {
    await render(hbs`{{job-detail}}`);
    assert.equal(this.$('.job-detail').length, 1);
    assert.equal(this.$('.panel-heading').length, 1);
    assert.equal(this.$('.panel-body').length, 1);
  });
});
