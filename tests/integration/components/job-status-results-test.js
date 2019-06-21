import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | job status results', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let job = EmberObject.create({
      outputProject: EmberObject.create({
        project: {id: 'abv-123', name: 'project-name'},
        dirName: 'results-dir'
      })
    });
    this.set('job', job);
    await render(hbs`{{job-status-results job}}`);
    assert.equal(this.$('span.job-status-results').length, 1);
    assert.equal(this.$('a.job-results-link').text(), 'project-name/results-dir');
    assert.ok(this.$('a').attr('href'));
  });
});
