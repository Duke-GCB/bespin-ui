import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobs-list', 'Integration | Component | jobs list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('jobs', [{id:1}, {id:2}, {id:3}]);
  this.render(hbs`{{jobs-list jobs}}`);
  assert.equal(this.$('thead tr').length, 1, 'should create one header row');
  assert.equal(this.$('tbody tr').length, 3, 'should create 3 body rows');
});
