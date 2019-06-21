import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | workflow version link', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.setup = function() {
      this.owner.lookup('router:main').setupRouter();
    };
  });

  test('it renders the workflowVersion version number and a link', async function(assert) {
    this.set('workflowVersion', EmberObject.create({
      id: 111,
      workflow: EmberObject.create({
        id: 333
      })
    }));

    await render(hbs`{{#workflow-version-link workflowVersion}}link text{{/workflow-version-link}}`);
    assert.equal(this.$('a').attr('href').trim(), '/workflows/333/versions/111');
    assert.equal(this.$('.workflow-version-link-text').text().trim(), 'link text');
  });
});
