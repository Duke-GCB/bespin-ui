import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | job summary detail row', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{job-summary-detail-row}}`);
    assert.equal(this.$('.job-summary-detail-row').text().trim(), '');
    await render(hbs`{{#job-summary-detail-row leadText='Lead Text'}}Body Text{{/job-summary-detail-row}}`);
    assert.equal(this.$('.job-summary-detail-row h4').text().trim(), 'Lead Text', 'should render lead text in h4');
    assert.equal(this.$('.job-summary-detail-row').text().trim(), 'Lead Text\n  Body Text', 'should render body text inside block');
  });
});
