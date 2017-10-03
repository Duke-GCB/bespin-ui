import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-summary-detail-row', 'Integration | Component | job summary detail row', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{job-summary-detail-row}}`);
  assert.equal(this.$('.job-summary-detail-row').text().trim(), '');
  this.render(hbs`{{#job-summary-detail-row leadText='Lead Text'}}Body Text{{/job-summary-detail-row}}`);
  assert.equal(this.$('.job-summary-detail-row h4').text().trim(), 'Lead Text', 'should render lead text in h4');
  assert.equal(this.$('.job-summary-detail-row').text().trim(), 'Lead Text\n  Body Text', 'should render body text inside block');
});
