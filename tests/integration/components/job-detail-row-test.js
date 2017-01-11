import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-detail-row', 'Integration | Component | job detail row', {
  integration: true
});

test('it renders', function(assert) {
  const job = {id:1,name:'job', workflowVersion: {workflow: {name:'RNA-seq'}}};
  this.set('job',job);
  this.render(hbs`{{job-detail-row job}}`);

  assert.equal(this.$('.job-detail-cell-id').text().trim(), '1');
  assert.equal(this.$('.job-detail-cell-name').text().trim(), 'job');
  assert.equal(this.$('.job-detail-cell-workflow-name').text().trim(), 'RNA-seq');

});
