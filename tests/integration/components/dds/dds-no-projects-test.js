import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | dds/dds no projects', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders an an alert-danger', async function(assert) {
    await render(hbs`{{dds/dds-no-projects}}`);
    assert.notEqual(this.$('.alert.alert-danger').text().trim(), '');
  });
});
