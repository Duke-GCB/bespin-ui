import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-status-results', 'Integration | Component | job status results', {
  integration: true
});

// This test is pretty barebones, pending https://github.com/Duke-GCB/bespin-ui/issues/70

test('it renders', function(assert) {
  this.render(hbs`{{job-status-results}}`);
  assert.equal(this.$().text().trim(), '/');
});
