import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('job-detail', 'Integration | Component | job detail', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{job-detail}}`);
  assert.equal(this.$('.job-detail').length, 1);
  assert.equal(this.$('.panel-heading').length, 1);
  assert.equal(this.$('.panel-body').length, 1);
});
