import { run } from '@ember/runloop';
import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | job state', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{job-state}}`);
    assert.equal(this.$('.job-state').length, 1);
  });

  test('it renders job properties', async function(assert) {
    let job = EmberObject.create({
      id: 314,
      state: 'R',
      getLiveUsage: () => resolve({})
    });
    this.set('job',job);
    await render(hbs`{{job-state job}}`);
    assert.equal(this.$('dd.job-id').text().trim(), '314');
    assert.equal(this.$('dd.state').text().trim(), 'Running');
  });


  test('it shows authorization code if job has a runToken', function(assert) {
    let job = EmberObject.create({
      getLiveUsage: () => resolve({})
    });
    this.set('job', job);
    run(async () => {
      await render(hbs`{{job-state job}}`);
      assert.equal(this.$('dd.run_token').length, 0);
      this.set('job.runToken', 'abc123');
      assert.equal(this.$('dd.run_token').length, 1);
      assert.equal(this.$('dd.run_token').text().trim(), 'abc123');
    });
  });

  test('it shows decoded job step if step is not empty', function(assert) {
    let job = EmberObject.create({
      getLiveUsage: () => resolve({})
    });
    this.set('job', job);
    run(async () => {
      await render(hbs`{{job-state job}}`);
      assert.equal(this.$('dd.step').length, 0);
      this.set('job.step', 'S');
      assert.equal(this.$('dd.step').length, 1);
      assert.equal(this.$('dd.step').text().trim(), 'Staging In');
    });
  });

  test('it shows vm and cpu hours', function(assert) {
    let job = EmberObject.create({
      getLiveUsage: () => resolve({
        vmHours: 1.21,
        cpuHours: 4.84,
      }),
    });
    this.set('job', job);
    run(async () => {
      await render(hbs`{{job-state job}}`);
    });
    run(() => {
      assert.equal(this.$('.running-hours').text(), '1.2');
      assert.equal(this.$('.cpu-hours').text(), '4.8');
    });
  });
});
