import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('job-state', 'Integration | Component | job state', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{job-state}}`);
  assert.equal(this.$('.job-state').length, 1);
});

test('it renders job properties', function(assert) {
  let job = Ember.Object.create({
    id: 314,
    state: 'R'
  });
  this.set('job',job);
  this.render(hbs`{{job-state job}}`);
  assert.equal(this.$('dd.job-id').text().trim(), '314');
  assert.equal(this.$('dd.state').text().trim(), 'Running');
});


test('it shows authorization code if job has a runToken', function(assert) {
  let job = Ember.Object.create();
  this.set('job', job);
  Ember.run(() => {
    this.render(hbs`{{job-state job}}`);
    assert.equal(this.$('dd.run_token').length, 0);
    this.set('job.runToken', 'abc123');
    assert.equal(this.$('dd.run_token').length, 1);
    assert.equal(this.$('dd.run_token').text().trim(), 'abc123');
  });
});

test('it shows decoded job step if step is not empty', function(assert) {
  let job = Ember.Object.create();
  this.set('job', job);
  Ember.run(() => {
    this.render(hbs`{{job-state job}}`);
    assert.equal(this.$('dd.step').length, 0);
    this.set('job.step', 'S');
    assert.equal(this.$('dd.step').length, 1);
    assert.equal(this.$('dd.step').text().trim(), 'Staging In');
  });
});
