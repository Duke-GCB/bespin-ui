import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | dds/dds output directory picker', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a form', async function(assert) {
    await render(hbs`{{dds/dds-output-directory-picker}}`);
    assert.equal(this.$('form').length, 1);
  });

  test('it registers changes to directoryName', async function(assert) {
    // This component doesn't do much
    // projects, directoryName, onChange
    let oldName = 'ABC';
    let newName = 'XYZ';
    let onChange = function(project, directoryName) {
      assert.equal(directoryName, newName);
    };
    this.set('onChange', onChange);
    this.set('oldName', oldName);
    this.set('projects', [])
    await render(hbs`{{dds/dds-output-directory-picker projects oldName onChange}}`);
    this.$('input').val(newName);
    this.$('input').change(); // Required to trigger the update
    this.$('input').keypress(); // Triggers onChange
  });
});
