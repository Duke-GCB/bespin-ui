import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('job-authorize', 'Integration | Component | job authorize', {
  integration: true
});

let MockJob = Ember.Object.extend({
  token: '',
  authorized: false,
  authorize: function () {
    this.set('authorized', true);
    return Ember.RSVP.resolve({});
  }
});

test('it renders', function(assert) {
  const mockJob = MockJob.create({token:'secret-1'});
  this.set('job', mockJob);
  this.render(hbs`{{job-authorize job}}`);

  assert.equal(this.$().text().trim().replace(/\n/g,''), 'Authorization Code:            Authorize');
  assert.equal(mockJob.authorized, false);
  this.$('button').click();
  assert.equal(mockJob.authorized, true);
});

test('it enables input and button when job needs authorization', function(assert) {
  this.set('job', Ember.Object.create({hasAuthorization: false}));
  this.render(hbs`{{job-authorize job}}`);
  assert.notOk(this.$('.job-authorize input').attr('disabled'));
  assert.notOk(this.$('.job-authorize button').attr('disabled'));

});

test('it disables input and button when job already has authorization', function(assert) {
  this.set('job', Ember.Object.create({hasAuthorization: true}));
  this.render(hbs`{{job-authorize job}}`);
  assert.ok(this.$('.job-authorize input').attr('disabled'));
  assert.ok(this.$('.job-authorize button').attr('disabled'));
});

test('it displays error elements when there are errors', function(assert) {
  this.render(hbs`{{job-authorize}}`);
  assert.equal(this.$('.has-error').length, 0);
  assert.equal(this.$('.help-block').length, 0);
  this.set('errors', [1,2,3]);
  this.render(hbs`{{job-authorize errors=errors}}`);
  assert.equal(this.$('.has-error').length, 1);
  assert.equal(this.$('.help-block').length, 1);
});
