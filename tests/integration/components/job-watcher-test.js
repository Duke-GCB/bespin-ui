import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const bespinJobWatcherStub = Ember.Service.extend({
  startWatching() {},
  stopWatching() {}
});

const sessionStub = Ember.Service.extend({
  data: {
    authenticated: {
      token: 'auth-token'
    }
  }
});

moduleForComponent('job-watcher', 'Integration | Component | job watcher', {
  integration: true,
  beforeEach() {
    let job = Ember.Object.create({
      id: 1234,
    });
    this.set('job', job);
    this.register('service:bespin-job-watcher', bespinJobWatcherStub);
    this.register('service:session', sessionStub);
  }
});

test('it renders an empty component', function(assert) {
  this.render(hbs`{{job-watcher job}}`);
  assert.equal(this.$().text().trim(), '');
});

test('it calls startWatching when rendered', function(assert) {
  assert.expect(2);
  this.register('service:bespin-job-watcher', bespinJobWatcherStub.extend({
    startWatching(token, jobId) {
      assert.equal(jobId, 1234);
      assert.equal(token, 'auth-token');
    },
  }));
  this.render(hbs`{{job-watcher job}}`);
});

test('it calls stopWatching after rendered', function(assert) {
  assert.expect(2);
  this.register('service:bespin-job-watcher', bespinJobWatcherStub.extend({
    stopWatching(token, jobId) {
      assert.equal(token, 'auth-token');
      assert.equal(jobId, 1234);
    },
  }));
  this.render(hbs`{{job-watcher job}}`);
});
