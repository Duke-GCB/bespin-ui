import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-versions-list', 'Integration | Component | workflow versions list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  let versions = [{'version': 1}, {'version': 2}];
  this.set('versions', versions);
  this.render(hbs`{{workflow-versions-list versions}}`);
  assert.equal(this.$('.workflow-version-detail-row').length, 2);
});
