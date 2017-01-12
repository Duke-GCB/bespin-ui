import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobs/new-job-wizard', 'Integration | Component | jobs/new job wizard', {
  integration: true,
});

test('it renders buttons', function(assert) {
  this.set('router', {transitionTo() {}, currentPath: ''});
  this.render(hbs`{{jobs/new-job-wizard router}}`);
  assert.equal(this.$('.back-button').text().trim(), 'Back');
  assert.equal(this.$('.next-button').text().trim(), 'Next');
});

test('it switches routes on next step', function(assert) {
  assert.expect(2);
  this.set('router', {transitionTo(route) {
    assert.equal(route, 'jobs.new.select-workflow');
  }, currentPath: 'jobs.new.index'});
  this.render(hbs`{{jobs/new-job-wizard router}}`);
  this.set('router', {transitionTo(route) {
    assert.equal(route, 'jobs.new.select-input-files');
  }, currentPath: 'jobs.new.select-workflow'});
  this.$('.next-button').click();
});

test('it switches routes on prev step', function(assert) {
  assert.expect(2);
  this.set('router', {transitionTo(route) {
    assert.equal(route, 'jobs.new.select-input-files');
  }, currentPath: 'jobs.new.select-input-files'});
  this.render(hbs`{{jobs/new-job-wizard router}}`);
  this.set('router', {transitionTo(route) {
    assert.equal(route, 'jobs.new.select-workflow');
  }, currentPath: 'jobs.new.select-input-files'});
  this.$('.back-button').click();
});
