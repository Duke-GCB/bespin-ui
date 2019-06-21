import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import StoreStub from "../../../helpers/store-stub";

module('Integration | Component | questionnaire/dds project field', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:store', StoreStub);
  });

  test('it renders', async function(assert) {
    await render(hbs`{{questionnaire/dds-project-field}}`);

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    await render(hbs`
      {{#questionnaire/dds-project-field}}
        template block text
      {{/questionnaire/dds-project-field}}
    `);

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
