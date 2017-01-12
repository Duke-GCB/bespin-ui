import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobs/select-workflow', 'Integration | Component | jobs/select workflow', {
  integration: true
});

test('it displays the job name', function(assert) {
  this.set('job', {name: 'myjob'});
  this.set('workflows', []);
  this.render(hbs`{{jobs/select-workflow workflows job}}`);
  assert.equal(this.$('.job-name input').val(), 'myjob');
});

