import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | job error', function(hooks) {
  setupRenderingTest(hooks);

  const mockJobError = EmberObject.create({
    created: 'Jan 1, 1970',
    jobStep: 'Step 1',
    stepIsCreateVm: true,
    stepIsStaging: false,
    stepIsRunning: false,
    stepIsStoreOutput: false,
    stepIsTerminateVm: false,
    content: 'Error Stacktrace'
  });

  test('it renders', async function(assert) {
    this.set('jobError', mockJobError);
    await render(hbs`{{job-error jobError}}`);
    assert.equal(this.$('dd.job-error-date').text().trim(), 'Jan 1, 1970');
    assert.equal(this.$('dd.job-error-step').text().trim(), 'Step 1');
    assert.ok(this.$('dd.job-error-description').text().trim().indexOf('failed during creation of the VM'));

  });

  test('it calls toggleCollapase on click', async function(assert) {
    this.set('jobError', mockJobError);
    this.set('toggleCollapse', () => { assert.ok(true); });
    await render(hbs`{{job-error jobError toggleCollapse=toggleCollapse}}`);
    run(() => {
      document.querySelector('dd.job-error-details button').click();
    });
  });
});
