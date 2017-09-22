import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-detail-title', 'Integration | Component | job detail title', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{job-detail-title}}`);
  assert.equal(this.$().text().trim(), '');
  this.set('job', Ember.Object.create({isNew: true}));
  this.render(hbs`{{job-detail-title job}}`);
  assert.notEqual(this.$().text().trim(), '');
});
