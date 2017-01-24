import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('dds/dds-file-checkbox', 'Integration | Component | dds/dds file checkbox', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{dds/dds-file-checkbox}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dds/dds-file-checkbox}}
      template block text
    {{/dds/dds-file-checkbox}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it calculates picked', function(assert) {
  let resource1 = Ember.Object.create({id:1});
  let resource2 = Ember.Object.create({id:2});

  this.set('resource1', resource1);
  this.set('pickedFiles', []);
  this.render(hbs`{{dds/dds-file-checkbox resource1 pickedFiles}}`);
  assert.notOk(this.$('input')[0].checked, 'Input should not be checked because resource1 is not in pickedFiles list');

  this.set('pickedFiles', [resource1, resource2]);
  this.render(hbs`{{dds/dds-file-checkbox resource1 pickedFiles}}`);
  assert.ok(this.$('input')[0].checked, 'Input should be checked because resource1 is in the list');

  this.set('pickedFiles', [resource2]);
  this.render(hbs`{{dds/dds-file-checkbox resource1 pickedFiles}}`);
  assert.notOk(this.$('input')[0].checked, 'Input should not be checked because resource1 is not in pickedFiles list');
});
