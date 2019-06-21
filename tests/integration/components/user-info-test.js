import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user-info', 'Integration | Component | user info', {
  integration: true
});

test('it renders user info', function(assert) {
  this.set('user', EmberObject.create({
    firstName: 'Justin',
    lastName: 'Bailey',
    username: 'samus'
  }));

  this.render(hbs`{{user-info user}}`);
  assert.equal(this.$().text().trim(), 'Justin Bailey (samus)');
});
