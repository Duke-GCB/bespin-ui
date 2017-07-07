import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('job-controls', 'Integration | Component | job controls', {
  integration: true
});

test('it renders 3 buttons', function(assert) {
  let job = {id: 6, name: 'Job Six', state: 'N'};
  this.set('job', job);
  this.render(hbs`{{job-controls job}}`);
  assert.equal(this.$('button').length, 3, 'Renders 3 buttons');
});

test('it enables start when Authorized', function(assert) {
  let job = {id: 6, name: 'Job Six', state: 'A'};
  this.set('job', job);
  this.render(hbs`{{job-controls job}}`);
  assert.equal(this.$('button:not(:disabled)').text(), 'Start');
  assert.equal(this.$('button[disabled]').length, 2);
});

test('it enables restart when Canceled, or Error', function(assert) {
  assert.expect(4);
  let states = ['C','E'];
  states.forEach(state => {
    let job = {id: 6, name: 'Job Six', state: state};
    this.set('job', job);
    this.render(hbs`{{job-controls job}}`);
    assert.equal(this.$('button:not(:disabled)').text(), 'Restart');
    assert.equal(this.$('button[disabled]').length, 2);
  });
});

test('it enables nothing when Finished', function(assert) {
  assert.expect(2);
  let job = {id: 6, name: 'Job Six', state: 'F'};
  this.set('job', job);
  this.render(hbs`{{job-controls job}}`);
  assert.equal(this.$('button:not(:disabled)').text(), '');
  assert.equal(this.$('button[disabled]').length, 3);
});

test('it enables cancel when Running', function(assert) {
  let job = {id: 6, name: 'Job Six', state: 'R'};
  this.set('job', job);
  this.render(hbs`{{job-controls job}}`);
  assert.equal(this.$('button:not(:disabled)').text(), 'Cancel');
  assert.equal(this.$('button[disabled]').length, 2);
});

test('it displays job control results on click', function(assert) {
  let statesMessages = [
    { state: 'A', message: 'started' },
    { state: 'R', message: 'canceled' },
    { state: 'E', message: 'restarted'}
  ];

  let MockSucceedJob = Ember.Object.extend({
    state: null,
    start() { return new Ember.RSVP.Promise((resolve) => { resolve('started'); }); },
    restart() { return new Ember.RSVP.Promise((resolve) => { resolve('restarted'); }); },
    cancel() { return new Ember.RSVP.Promise((resolve) => { resolve('canceled'); }); }
  });

  let MockFailJob = Ember.Object.extend({
    state: null,
    start() { return new Ember.RSVP.Promise((resolve, reject) => { reject('fail-started'); }); },
    restart() { return new Ember.RSVP.Promise((resolve, reject) => { reject('fail-restarted'); }); },
    cancel() { return new Ember.RSVP.Promise((resolve, reject) => { reject('fail-canceled'); }); }
  });

  statesMessages.forEach(stateMessage => {
    // Test for success
    this.set('job', MockSucceedJob.create({state: stateMessage.state}));
    this.render(hbs`{{job-controls job}}`);
    this.$('button:not(:disabled)').click();
    assert.equal(this.$('span.success-message').text(), stateMessage.message);
    assert.equal(this.$('span.error-message').length, 0);

    // Test for failure
    this.set('job', MockFailJob.create({state: stateMessage.state}));
    this.render(hbs`{{job-controls job}}`);
    this.$('button:not(:disabled)').click();
    assert.equal(this.$('span.success-message').length, 0);
    assert.equal(this.$('span.error-message').text(), 'fail-' + stateMessage.message);

  });
});
