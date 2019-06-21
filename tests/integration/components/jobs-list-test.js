import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | jobs list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('jobs', [{id:1}, {id:2}, {id:3}]);
    await render(hbs`{{jobs-list jobs}}`);
    assert.equal(this.$('thead tr').length, 1, 'should create one header row');
    assert.equal(this.$('tbody tr').length, 3, 'should create 3 body rows');
  });
});
