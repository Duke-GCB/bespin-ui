import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('share-group-contact', 'Integration | Component | share group contact', {
  integration: true
});

test('it renders share group name and email', function(assert) {
  const shareGroup = EmberObject.create({
    name: 'Share Group',
    email: 'sharegroup@example.com'
  });
  this.set('shareGroup', shareGroup);

  this.render(hbs`{{share-group-contact}}`);
  assert.equal(this.$().text().trim(), '');

  this.render(hbs`{{share-group-contact shareGroup}}`);
  assert.equal(this.$().text().trim(), 'Share Group');
  assert.equal(this.$('a.share-group-contact').attr('href'), 'mailto:sharegroup@example.com');
});
