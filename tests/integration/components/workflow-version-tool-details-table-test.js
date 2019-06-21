import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const TestDetails = {
  details: [
    {
      tool_name: 'tool1',
      packages: [{citation: 'http://tool1.org', package: 'package1', versions: ['v1']}],
      docker_images: ['org1/tool1']
    },
    {
      tool_name: 'tool2',
      packages: [{citation: 'http://tool2.org', package: 'package2', versions: ['v2']}],
      docker_images: ['tool2']
    }
  ]
};

module('Integration | Component | workflow version tool details table', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('testDetails', TestDetails);
  });

  test('it renders a row for each tool', async function(assert) {
    await render(hbs`{{workflow-version-tool-details-table testDetails}}`);
    // should be two rows
    assert.equal(this.$('tr.tool-detail-row').length, 2);
  });

  test('it renders tool names', async function(assert) {
    await render(hbs`{{workflow-version-tool-details-table testDetails}}`);
    assert.equal(this.$('.tool-name').eq(0).text(), 'tool1');
    assert.equal(this.$('.tool-name').eq(1).text(), 'tool2');
  });

  test('it renders package names and citation links', async function(assert) {
    await render(hbs`{{workflow-version-tool-details-table testDetails}}`);
    assert.equal(this.$('.tool-package').eq(0).text().trim(), 'package1 v1');
    assert.equal(this.$('.tool-package a').eq(0).attr('href'), 'http://tool1.org');
    assert.equal(this.$('.tool-package').eq(1).text().trim(), 'package2 v2');
    assert.equal(this.$('.tool-package a').eq(1).attr('href'), 'http://tool2.org');
  });

  test('it renders docker image names and links', async function(assert) {
    await render(hbs`{{workflow-version-tool-details-table testDetails}}`);
    assert.equal(this.$('.tool-docker-image').eq(0).text().trim(), 'org1/tool1');
    assert.equal(this.$('.tool-docker-image a').eq(0).attr('href'), 'https://hub.docker.com/r/org1/tool1');
    assert.equal(this.$('.tool-docker-image').eq(1).text().trim(), 'tool2');

    // Check that two cells are rendered but only one link
    assert.equal(this.$('.tool-docker-image').length, 2);
    assert.equal(this.$('.tool-docker-image a').length, 1); // Only renders
  });
});
