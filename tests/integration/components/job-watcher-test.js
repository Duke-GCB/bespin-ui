import EmberObject from '@ember/object';
import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const bespinJobWatcherStub = Service.extend({
  startWatching() {},
  stopWatching() {}
});

const sessionStub = Service.extend({
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  data: {
    authenticated: {
      token: 'auth-token'
    }
  }
});

module('Integration | Component | job watcher', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    let job = EmberObject.create({
      id: 1234,
    });
    this.set('job', job);
    this.owner.register('service:bespin-job-watcher', bespinJobWatcherStub);
    this.owner.register('service:session', sessionStub);
  });

  test('it renders an empty component', async function(assert) {
    await render(hbs`{{job-watcher job}}`);
    assert.equal(this.$().text().trim(), '');
  });

  test('it calls startWatching when rendered', async function(assert) {
    assert.expect(2);
    this.owner.register('service:bespin-job-watcher', bespinJobWatcherStub.extend({
      startWatching(token, jobId) {
        assert.equal(jobId, 1234);
        assert.equal(token, 'auth-token');
      },
    }));
    await render(hbs`{{job-watcher job}}`);
  });

  test('it calls stopWatching after rendered', async function(assert) {
    assert.expect(2);
    this.owner.register('service:bespin-job-watcher', bespinJobWatcherStub.extend({
      stopWatching(token, jobId) {
        assert.equal(token, 'auth-token');
        assert.equal(jobId, 1234);
      },
    }));
    await render(hbs`{{job-watcher job}}`);
  });
});
