import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-resource-node', 'Integration | Component | dds/dds resource node', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  //   positionalParams: ['resource', 'expanded', 'pickedResources']
  this.set('resource', {name:'file.txt'});
  this.render(hbs`{{dds/dds-resource-node resource}}`);
  assert.equal(this.$('.dds-resource-name').text().trim(), 'file.txt');
});

test('it sends action on click', function(assert) {
  this.set('resource', {name:'file.txt'});
  this.render(hbs`{{dds/dds-resource-node resource action='testAction'}}`);
  this.on('testAction', function() { assert.ok(true); });
  this.$('.dds-resource-name').click();
});
