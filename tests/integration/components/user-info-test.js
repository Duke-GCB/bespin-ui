import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('user-info', 'Integration | Component | user info', {
  integration: true
});

test('it renders user info', function(assert) {
  this.set('user', Ember.Object.create({
    firstName: 'Justin',
    lastName: 'Bailey',
    username: 'samus'
  }));

  this.render(hbs`{{user-info user}}`);
  assert.equal(this.$().text().trim(), 'Justin Bailey (samus)');
});
