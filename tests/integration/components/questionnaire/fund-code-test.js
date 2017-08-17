import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/fund-code', 'Integration | Component | questionnaire/fund code', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{questionnaire/fund-code}}`);

  assert.equal(this.$().text().trim(), 'Fund Code:');
});
