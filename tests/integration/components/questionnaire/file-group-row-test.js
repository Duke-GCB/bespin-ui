import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | questionnaire/file group row', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{questionnaire/file-group-row 0 0}}`);
    assert.equal(this.$().text().trim(), 'Group 1', 'It computes the display index as group + 1');

    await render(hbs`{{questionnaire/file-group-row 3 8}}`);
    assert.equal(this.$().text().trim(), 'Group 9', 'It computes the display index as group + 1');

    this.set('groupName', 'sample');
    await render(hbs`{{questionnaire/file-group-row 3 8 groupName=groupName}}`);
    assert.equal(this.$().text().trim(), 'Sample 9', 'It computes the display index as group + 1');

  });
});

