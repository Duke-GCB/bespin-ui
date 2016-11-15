import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-detail-row', 'Integration | Component | project detail row', {
  integration: true
});

test('it renders project name', function(assert) {
  this.set('project', {'id': 1, name:'foo'});
  this.set('selectedProject', {'id': 2, name: 'bar'});
  this.render(hbs`{{project-detail-row project selectedProject }}`);
  assert.equal(this.$('.project-name').text().trim(), 'foo', 'project name is rendered');
  assert.equal(this.$('.glyphicon-ok').length, 0, 'selected icon is not present');
});

test('it renders selected state', function(assert) {
  this.set('project', {'id': 1, name:'foo'});
  this.set('selectedProject', this.get('project'));
  this.render(hbs`{{project-detail-row project selectedProject}}`);
  assert.equal(this.$('.glyphicon-ok').length, 1, 'selected icon is present');
});

test('it handles click action', function(assert) {
  assert.expect(1); // Expect onPick to be called
  this.set('project', {'id': 1, name:'foo'});
  this.set('selectedProject', this.get('project'));
  this.set('onPick', function() {
    assert.ok(true, 'onPick was called');
  });
  this.render(hbs`{{project-detail-row project selectedProject onPick}}`);
  this.$('.project-detail-row').click();
});
