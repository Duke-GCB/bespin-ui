import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | error panel', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('noErrors', [])
    this.set('oneError', [{
      'attribute': 'jobName',
      'message': 'required',
    }]);

    await render(hbs`{{error-panel errors=noErrors}}`);
    assert.equal(this.$().text().trim(), '');

    await render(hbs`{{error-panel errors=oneError}}`);
    assert.equal(this.$('li').text(), 'required');


    await render(hbs`
      {{#error-panel errors=oneError}}
        <span class='childtext'>template block text</span>
      {{/error-panel}}
    `);

    assert.equal(this.$('.childtext').text().trim(), 'template block text');
  });
});
