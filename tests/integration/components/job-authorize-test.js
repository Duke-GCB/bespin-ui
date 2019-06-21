import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | job authorize', function(hooks) {
  setupRenderingTest(hooks);

  let MockJob = EmberObject.extend({
    token: '',
    authorized: false,
    authorize: function () {
      this.set('authorized', true);
      return resolve({});
    }
  });

  test('it renders', async function(assert) {
    const mockJob = MockJob.create({token:'secret-1'});
    this.set('job', mockJob);
    await render(hbs`{{job-authorize job}}`);

    assert.equal(this.$().text().trim().replace(/\n/g,''), 'Authorization Code:            Authorize');
    assert.equal(mockJob.authorized, false);
    this.$('button').click();
    assert.equal(mockJob.authorized, true);
  });

  test('it enables input and button when job needs authorization', async function(assert) {
    this.set('job', EmberObject.create({hasAuthorization: false}));
    await render(hbs`{{job-authorize job}}`);
    assert.notOk(this.$('.job-authorize input').attr('disabled'));
    assert.notOk(this.$('.job-authorize button').attr('disabled'));

  });

  test('it disables input and button when job already has authorization', async function(assert) {
    this.set('job', EmberObject.create({hasAuthorization: true}));
    await render(hbs`{{job-authorize job}}`);
    assert.ok(this.$('.job-authorize input').attr('disabled'));
    assert.ok(this.$('.job-authorize button').attr('disabled'));
  });

  test('it displays error elements when there are errors', async function(assert) {
    await render(hbs`{{job-authorize}}`);
    assert.equal(this.$('.has-error').length, 0);
    assert.equal(this.$('.help-block').length, 0);
    this.set('errors', [1,2,3]);
    await render(hbs`{{job-authorize errors=errors}}`);
    assert.equal(this.$('.has-error').length, 1);
    assert.equal(this.$('.help-block').length, 1);
  });
});
