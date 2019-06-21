import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | questionnaire/job name', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a job name', async function(assert) {
    let answerSet = EmberObject.create({
      jobName: 'test'
    });
    this.set('answerSet', answerSet);
    await render(hbs`{{questionnaire/job-name answerSet}}`);
    assert.equal(this.$('label').text(), 'Job Name:');
    assert.equal(this.$('.job-name-input').val(), 'test');
  });
});
