import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('questionnaire/dds-output-directory-answers', 'Integration | Component | questionnaire/dds output directory answers', {
  integration: true,
  beforeEach() {
    this.register('service:dds-projects', Ember.Service.extend());
    this.inject.service('dds-projects', {as: 'dds-projects'});
  }

});

test('it renders', function(assert) {
  this.render(hbs`{{questionnaire/dds-output-directory-answers label='Output Directory'}}`);
  assert.equal(this.$('label').text().trim(), 'Output Directory');
});
