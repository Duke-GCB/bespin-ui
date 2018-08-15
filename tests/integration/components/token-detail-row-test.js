import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('token-detail-row', 'Integration | Component | token detail row', {
  integration: true
});

test('it renders', function(assert) {
  this.set('token', Ember.Object.create(
    {
      id: 'ABCD123',
      created: 'SOMEDATE'
    }));
  this.render(hbs`{{token-detail-row token=token}}`);

  assert.equal(this.$('td').length, 3);
  assert.equal(this.$('td').eq(0).text(), 'ABCD123', 'First column should display the token id');
  assert.equal(this.$('td').eq(1).text(), 'SOMEDATE', 'Second column should display the created date');
  assert.equal(this.$('td').eq(2).text(), 'Delete', 'Third column should show a delete button');
});
