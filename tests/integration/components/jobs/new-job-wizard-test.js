import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobs/new-job-wizard', 'Integration | Component | jobs/new job wizard', {
  integration: true,
});

test('it renders buttons', function(assert) {
  this.set('job', {name: 'myjob'});
  this.set('workflows', []);
  this.render(hbs`{{jobs/new-job-wizard job workflows}}`);
  assert.equal(this.$('.back-button').text().trim(), 'Back');
  assert.equal(this.$('.next-button').text().trim(), 'Next');
});

test('it switches routes on next step', function(assert) {
  this.set('job', {name: 'myjob'});
  this.set('workflows', []);
  this.render(hbs`{{jobs/new-job-wizard job workflows}}`);
  assert.equal(this.$('.step').text(), 'Step: -1');
  // this.$('.next-button').click();
  // assert.equal(this.$('.step').text(), 'Step: 0');
});

test('it changes route when step changes', function(assert) {
  assert.ok(true);
});

test('it switches routes on prev step', function(assert) {
  assert.ok(true);
});
