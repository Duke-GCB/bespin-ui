import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('workflow-version-link', 'Integration | Component | workflow version link', {
  integration: true,
  setup() {
    this.container.lookup('router:main').setupRouter();
  }
});

test('it renders the workflowVersion version number and a link', function(assert) {
  this.set('workflowVersion', Ember.Object.create({
    id: 111,
    version: 222,
    workflow: Ember.Object.create({
      id: 333
    })
  }));

  this.render(hbs`{{workflow-version-link workflowVersion=workflowVersion}}`);

  assert.equal(this.$('a').attr('href').trim(), '/workflows/333/versions/111');
  assert.equal(this.$('.workflow-version-link-text').text().trim(), 'v222');
});
