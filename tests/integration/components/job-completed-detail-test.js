import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('job-completed-detail', 'Integration | Component | job completed detail', {
  integration: true
});

test('it renders two paragraphs', function(assert) {
  this.render(hbs`{{job-completed-detail}}`);
  assert.equal(this.$('p.body').length, 2);
});

test('it renders share group', function(assert) {
  this.set('email', 'name@example.com');
  this.set('shareGroup', Ember.Object.create({name: 'TEST GROUP'}));
  this.render(hbs`{{job-completed-detail shareGroup email}}`);
  assert.notEqual(this.$().text().indexOf('review by the TEST GROUP'), -1);
});

test('it renders email address if present', function(assert) {
  this.set('email', 'name@example.com');
  this.set('shareGroup', Ember.Object.create());
  this.render(hbs`{{job-completed-detail shareGroup email}}`);
  assert.ok(this.$().text().indexOf('You will receive an email at name@example.com when the job finishes'));
});
