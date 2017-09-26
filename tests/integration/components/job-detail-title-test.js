import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('job-detail-title', 'Integration | Component | job detail title', {
  integration: true
});

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
  states.forEach((state) => {
    let job = Ember.Object.create();
    job.set(state, true);
    this.set('job', job);
    this.render(hbs`{{job-detail-title job}}`);
    assert.notEqual(this.$().text().trim(), '');
  });
});

test('it renders no text for invalid valid states', function (assert) {
  assert.expect(states.length + 1);
  let job = Ember.Object.create({});
  states.forEach((state) => {
    assert.notOk(job.get(state), `${state} is a valid state, job should not be in a valid state`);
  });
  this.set('job', job);
  this.render(hbs`{{job-detail-title job}}`);
  assert.equal(this.$().text().trim(), '');
});
