import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/string-answers', 'Integration | Component | questionnaire/string answers', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{questionnaire/string-answers}}`);
  assert.equal(this.$().text().trim(), '');
});
