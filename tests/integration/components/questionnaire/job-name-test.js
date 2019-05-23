import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/job-name', 'Integration | Component | questionnaire/job name', {
  integration: true
});

test('it renders a job name', function(assert) {
  let answerSet = EmberObject.create({
    jobName: 'test'
  });
  this.set('answerSet', answerSet);
  this.render(hbs`{{questionnaire/job-name answerSet}}`);
  assert.equal(this.$('label').text(), 'Job Name:');
  assert.equal(this.$('.job-name-input').val(), 'test');
});
