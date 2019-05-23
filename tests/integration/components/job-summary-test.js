import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import UserStub from '../../helpers/user-stub';

moduleForComponent('job-summary', 'Integration | Component | job summary', {
  integration: true,
  beforeEach() {
    this.register('service:user', UserStub);
  }
});

test('it renders summary heading', function(assert) {
  const job = EmberObject.create({
    name: 'Test Job',
    getLiveUsage: () => resolve({})
  });
  this.set('job', job);
  this.render(hbs`{{job-summary job}}`);
  assert.equal(this.$('h3').text().trim(), 'Bespin Job \'Test Job\'');
});

test('it renders 3 summary detail rows', function(assert) {
  this.render(hbs`{{job-summary}}`);
  assert.equal(this.$('.job-summary-detail-row').length, 3);
});

test('it renders a workflow-version-summary and workflow-version link', function(assert) {
  this.render(hbs`{{job-summary}}`);
  assert.equal(this.$('.job-summary-detail-row .workflow-version-summary').length, 1);
  assert.equal(this.$('.job-summary-detail-row .workflow-version-summary .workflow-version-link a').text().trim(), 'More...');
});
