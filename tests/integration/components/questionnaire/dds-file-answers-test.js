import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('questionnaire/dds-file-answer', 'Integration | Component | questionnaire/dds file answers', {
  integration: true,
  beforeEach: function() {
    this.register('service:dds-projects', Ember.Service.extend());
    this.inject.service('dds-projects', {as: 'dds-projects'});
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{questionnaire/dds-file-answers label='Label'}}`);
  assert.equal(this.$('label').text(), 'Label');
});
