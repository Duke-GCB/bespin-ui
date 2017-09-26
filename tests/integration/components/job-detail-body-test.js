import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('job-detail-body', 'Integration | Component | job detail body', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{job-detail-body}}`);
  assert.equal(this.$('p').text().trim(), '');
  this.set('job', Ember.Object.create({isNew: true}));
  this.render(hbs`{{job-detail-body job}}`);
  assert.notEqual(this.$('p').text().trim(), '');
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

test('it renders job-authorize only for isNew and isAuthorized,', function(assert) {
  assert.expect(states.length); // 2 assertions per state
  states.forEach((state) => {
    let job = Ember.Object.create();
    job.set(state, true);
    this.set('job', job);
    this.render(hbs`{{job-detail-body job}}`);
    if(state === 'isNew' || state === 'isAuthorized') {
      assert.equal(this.$('.job-authorize').length, 1, `.job-authorize should be rendered when job.${state} is true`);
    } else {
      assert.equal(this.$('.job-authorize').length, 0, `.job-authorize should not be rendered when job.${state} is false`);
    }
  });
});

test('it renders job-error only for isError,', function(assert) {
  assert.expect(states.length); // 2 assertions per state
  states.forEach((state) => {
    let job = Ember.Object.create();
    job.set(state, true);
    this.set('job', job);
    this.render(hbs`{{job-detail-body job}}`);
    if(state === 'isErrored') {
      assert.equal(this.$('.job-error').length, 1, `.job-error should be rendered when job.${state} is true`);
    } else {
      assert.equal(this.$('.job-error').length, 0, `.job-error should not be rendered when job.${state} is false`);
    }
  });
});

test('it renders text for all valid states', function (assert) {
  assert.expect(states.length);
  states.forEach((state) => {
    let job = Ember.Object.create();
    job.set(state, true);
    this.set('job', job);
    this.render(hbs`{{job-detail-body job}}`);
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
  this.render(hbs`{{job-detail-body job}}`);
  assert.equal(this.$().text().trim(), '');
});
