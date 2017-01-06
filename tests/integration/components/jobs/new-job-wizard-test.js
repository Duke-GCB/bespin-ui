import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('jobs/new-job-wizard', 'Integration | Component | jobs/new job wizard', {
  integration: true,
});


test('it renders buttons', function(assert) {
  this.set('job', {name: 'myjob'});
  this.set('workflows', []);
  this.set('router', {});
  this.render(hbs`{{jobs/new-job-wizard job workflows router}}`);
  assert.equal(this.$('.back-button').text().trim(), 'Back');
  assert.equal(this.$('.next-button').text().trim(), 'Next');
});

test('it switches routes on next step', function(assert) {
  assert.expect(2);
  this.set('job', {name: 'myjob'});
  this.set('workflows', []);
  this.set('router', {transitionTo(route) {
    assert.equal(route, 'jobs.new.select-workflow');
  }, currentPath: 'jobs.new.index'});
  this.render(hbs`{{jobs/new-job-wizard job workflows router}}`);
  this.set('router', {transitionTo(route) {
    assert.equal(route, 'jobs.new.select-input-files');
  }, currentPath: 'jobs.new.select-workflow'});
  this.$('.next-button').click();
});

test('it changes route when step changes', function(assert) {
  assert.ok(true);
});

test('it switches routes on prev step', function(assert) {
  assert.ok(true);
});
