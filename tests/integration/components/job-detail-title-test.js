import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | job detail title', function(hooks) {
  setupRenderingTest(hooks);

  const states = [
    'isNew',
    'isAuthorized',
    'isStarting',
    'isRunning',
    'isFinished',
    'isErrored',
    'isCanceling',
    'isCanceled',
    'isRestarting'];

  test('it renders text for all valid states', function (assert) {
    assert.expect(states.length);
    states.forEach(async state => {
      let job = EmberObject.create();
      job.set(state, true);
      this.set('job', job);
      await render(hbs`{{job-detail-title job}}`);
      assert.notEqual(this.$().text().trim(), '');
    });
  });

  test('it renders no text for invalid valid states', async function(assert) {
    assert.expect(states.length + 1);
    let job = EmberObject.create({});
    states.forEach((state) => {
      assert.notOk(job.get(state), `${state} is a valid state, job should not be in a valid state`);
    });
    this.set('job', job);
    await render(hbs`{{job-detail-title job}}`);
    assert.equal(this.$().text().trim(), '');
  });
});
