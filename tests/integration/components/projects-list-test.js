import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('projects-list', 'Integration | Component | projects list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('data', [{id: 1, name:'one'}, {id:2,name:'two'}]);
  this.render(hbs`{{projects-list data}}`);

  assert.equal(this.$('article').length, 2);
  assert.equal(this.$('article').first().text(), '1 - one');

});
