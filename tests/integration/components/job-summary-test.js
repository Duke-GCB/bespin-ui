import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('job-summary', 'Integration | Component | job summary', {
  integration: true
});

test('it renders summary heading', function(assert) {
  const job = Ember.Object.create({
    name: 'Test Job'
  });
  this.set('job', job);
  this.render(hbs`{{job-summary job}}`);
  assert.equal(this.$('h3').text().trim(), 'Summary for Job \'Test Job\'');
});

test('it renders 3 summary detail rows', function(assert) {
  this.render(hbs`{{job-summary}}`);
  assert.equal(this.$('.job-summary-detail-row').length, 3);
});
