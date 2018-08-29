import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/answerable-field', 'Integration | Component | questionnaire/answerable field', {
  integration: true
});

test('it renders nothing but requires two positional parameters', function(assert) {
  this.set('externalAction', () => {});
  this.render(hbs`{{questionnaire/answerable-field "someFieldname" (action externalAction)}}`);
  assert.equal(this.$().text().trim(), '');
});
