import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/file-group-row', 'Integration | Component | questionnaire/file group row', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{questionnaire/file-group-row 0 0}}`);
  assert.equal(this.$().text().trim(), 'Group 1', 'It computes the display index as group + 1');

  this.render(hbs`{{questionnaire/file-group-row 3 8}}`);
  assert.equal(this.$().text().trim(), 'Group 9', 'It computes the display index as group + 1');
});

