import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('job-oncompletion-detail', 'Integration | Component | job oncompletion detail', {
  integration: true
});

test('it renders two paragraphs', function(assert) {
  this.render(hbs`{{job-oncompletion-detail}}`);
  assert.equal(this.$('p.body').length, 2);
});

test('it renders share group', function(assert) {
  this.set('email', 'name@example.com');
  this.set('shareGroup', Ember.Object.create({name: 'TEST GROUP'}));
  this.render(hbs`{{job-oncompletion-detail shareGroup email}}`);
  assert.ok(this.$().text().indexOf('If the TEST GROUP has any feedback on the data'));
});

test('it renders email address if present', function(assert) {
  this.set('email', 'name@example.com');
  this.set('shareGroup', Ember.Object.create());
  this.render(hbs`{{job-oncompletion-detail shareGroup email}}`);
  assert.ok(this.$().text().indexOf('You will receive an email at name@example.com when the job finishes'));
});
