import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobs/select-input-files', 'Integration | Component | jobs/select input files', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{jobs/select-input-files}}`);
  assert.equal(this.$('h3').text().trim(), 'Select input files');
});
