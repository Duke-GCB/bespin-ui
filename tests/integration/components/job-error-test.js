import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('job-error', 'Integration | Component | job error', {
  integration: true
});

const mockJobError = Ember.Object.create({
  created: 'Jan 1, 1970',
  jobStep: 'Step 1',
  stepIsCreateVm: true,
  stepIsStaging: false,
  stepIsRunning: false,
  stepIsStoreOutput: false,
  stepIsTerminateVm: false,
  content: 'Error Stacktrace'
});

test('it renders', function(assert) {
  this.set('jobError', mockJobError);
  this.render(hbs`{{job-error jobError}}`);
  assert.equal(this.$('dd.job-error-date').text().trim(), 'Jan 1, 1970');
  assert.equal(this.$('dd.job-error-step').text().trim(), 'Step 1');
  assert.ok(this.$('dd.job-error-description').text().trim().indexOf('failed during creation of the VM'));

});

test('it calls toggleCollapase on click', function(assert) {
  this.set('jobError', mockJobError);
  this.set('toggleCollapse', () => { assert.ok(true); });
  this.render(hbs`{{job-error jobError toggleCollapse=toggleCollapse}}`);
  Ember.run(() => {
    document.querySelector('dd.job-error-details button').click();
  });
});
