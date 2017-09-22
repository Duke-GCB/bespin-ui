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
