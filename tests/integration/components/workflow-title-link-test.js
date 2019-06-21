import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | workflow title link', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('myworkflow', {
      name: 'Exomeseq',
    });


    await render(hbs`{{workflow-title-link workflow=myworkflow}}`);
    assert.equal(this.$().text().trim().replace(/ /g,''), 'Workflow:\nExomeseq');

    // Template block usage:
    await render(hbs`
      {{#workflow-title-link}}
        <p>template block text</p>
      {{/workflow-title-link}}
    `);

    assert.equal(this.$("p").text().trim(), 'template block text');

  });
});
