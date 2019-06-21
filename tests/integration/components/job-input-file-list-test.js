import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | job input file list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{job-input-file-list}}`);
    assert.equal(this.$('table').length, 0, 'should not render a table when no files');
    assert.equal(this.$().text().trim(), '');
  });

  test('it renders a table when there are files', async function(assert) {
    this.set('files', [EmberObject.create({destinationPath: '/path', 'size': 100})]);
    await render(hbs`{{job-input-file-list files}}`);
    assert.equal(this.$('table').length, 1);
    assert.equal(this.$('td').length, 2);
  });

  test('it renders From data source in panel-heading only when there is a source', async function(assert) {
    this.set('files', [EmberObject.create()]);
    this.set('source', '');
    await render(hbs`{{job-input-file-list files source}}`);
    assert.equal(this.$('div.panel-heading').length, 0);

    this.set('files', [EmberObject.create()]);
    this.set('source', 'devnull');
    await render(hbs`{{job-input-file-list files source}}`);
    assert.equal(this.$('div.panel-heading').length, 1);
    assert.equal(this.$('div.panel-heading').text().trim(), 'devnull');
  });

  test('it renders human readable sizes', async function(assert) {
    this.set('files', [EmberObject.create({destinationPath: 'file.gz', 'size': 7 * 1024 * 1024 * 1024})]);
    await render(hbs`{{job-input-file-list files}}`);
    assert.equal(this.$('table').length, 1);
    assert.equal(this.$('td').length, 2);
    assert.equal(this.$('td.file-destination-path').text(), 'file.gz');
    assert.equal(this.$('td.file-size').text(), '7.00 GiB');
  });
});
