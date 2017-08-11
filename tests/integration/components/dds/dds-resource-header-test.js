import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-resource-header', 'Integration | Component | dds/dds resourceheader', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{dds/dds-resource-header title='Header Title' icon='iconclass'}}`);
  assert.equal(this.$().text().trim(), 'Header Title');
  assert.equal(this.$('.iconclass').length, 1);
});

test('it sends action on click', function(assert) {
  this.set('testAction', () => {
    assert.ok(true);
  });
  this.render(hbs`{{dds/dds-resource-header action=(action testAction)}}`);
  this.$('.dds-resource-header').click();
});
