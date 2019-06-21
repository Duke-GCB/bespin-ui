import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | job oncompletion detail', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders two paragraphs', async function(assert) {
    await render(hbs`{{job-oncompletion-detail}}`);
    assert.equal(this.$('p.body').length, 2);
  });

  test('it renders share group', async function(assert) {
    this.set('email', 'name@example.com');
    this.set('shareGroup', EmberObject.create({name: 'TEST GROUP'}));
    await render(hbs`{{job-oncompletion-detail shareGroup email}}`);
    assert.notEqual(this.$().text().indexOf('review by the TEST GROUP'), -1);
  });

  test('it renders email address if present', async function(assert) {
    this.set('email', 'name@example.com');
    this.set('shareGroup', EmberObject.create());
    await render(hbs`{{job-oncompletion-detail shareGroup email}}`);
    assert.ok(this.$().text().indexOf('You will receive an email at name@example.com when the job finishes'));
  });
});
