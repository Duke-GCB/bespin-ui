import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import UserStub from '../../helpers/user-stub';

module('Integration | Component | job summary', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:user', UserStub);
  });

  test('it renders summary heading', async function(assert) {
    const job = EmberObject.create({
      name: 'Test Job',
      getLiveUsage: () => resolve({})
    });
    this.set('job', job);
    await render(hbs`{{job-summary job}}`);
    assert.equal(this.$('h3').text().trim(), 'Bespin Job \'Test Job\'');
  });

  test('it renders 3 summary detail rows', async function(assert) {
    await render(hbs`{{job-summary}}`);
    assert.equal(this.$('.job-summary-detail-row').length, 3);
  });

  test('it renders a workflow-version-summary and workflow-version link', async function(assert) {
    await render(hbs`{{job-summary}}`);
    assert.equal(this.$('.job-summary-detail-row .workflow-version-summary').length, 1);
    assert.equal(this.$('.job-summary-detail-row .workflow-version-summary .workflow-version-link a').text().trim(), 'More...');
  });
});
