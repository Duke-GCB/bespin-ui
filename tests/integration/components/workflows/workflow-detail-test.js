import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const workflowVersion2 = {
  id: '2',
  version: 'v2.0.0',
  description: 'My workflow2',
  created: 'Feb 1 2017',
  url: 'http://example.org/v2.cwl'
};

const workflowVersion3 = {
  id: '3',
  version: 'v3.0.0',
  description: 'My workflow3',
  created: 'Feb 13 2017',
  url: 'http://example.org/v3.cwl'
};

const workflow ={
  id: '1',
  name: 'Exomeseq',
  versions: [workflowVersion2, workflowVersion3]
};

module('Integration | Component | workflows/workflow detail', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.setup = function() {
      this.owner.lookup('router:main').setupRouter();
    };
  });

  hooks.beforeEach(function() {
    this.set('workflow', workflow);
  });

  test('it renders one element with class workflow-detail', async function(assert) {
    await render(hbs`{{workflows/workflow-detail workflow}}`);
    assert.equal(this.$('.workflow-detail').length, 1);
  });

  test('it renders the workflow name', async function(assert) {
    await render(hbs`{{workflows/workflow-detail workflow}}`);
    assert.equal(this.$('.workflow-detail .name').text(), 'Exomeseq');
    assert.equal(this.$('.workflow-detail .name').length, 1);
  });

  test('it renders a versions table with a header row', async function(assert) {
    await render(hbs`{{workflows/workflow-detail workflow}}`);
    assert.equal(this.$('.workflow-detail table.versions-table').length, 1);
    assert.equal(this.$('.workflow-detail table.versions-table tr.header-row').length, 1);
  });

  test('it renders a row for each workflow version', async function(assert) {
    await render(hbs`{{workflows/workflow-detail workflow}}`);
    assert.equal(this.$('.workflow-detail table.versions-table tr.version-row').length, 2);
  });

  test('it renders link, description, and created', async function(assert) {
    await render(hbs`{{workflows/workflow-detail workflow}}`);
    assert.equal(this.$('tr.version-row td.version-cell a').last().attr('href'), '/workflows/1/versions/2');
    assert.equal(this.$('tr.version-row td.version-cell a').last().text().trim(), 'v2.0.0');
    assert.equal(this.$('tr.version-row td.description-cell').last().text().trim(), 'My workflow2');
    assert.equal(this.$('tr.version-row td.created-cell').last().text().trim(), 'February 1, 2017');
  });
});
