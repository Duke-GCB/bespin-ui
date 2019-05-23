import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-version-link', 'Integration | Component | workflow version link', {
  integration: true,
  setup() {
    this.container.lookup('router:main').setupRouter();
  }
});

test('it renders the workflowVersion version number and a link', function(assert) {
  this.set('workflowVersion', EmberObject.create({
    id: 111,
    workflow: EmberObject.create({
      id: 333
    })
  }));

  this.render(hbs`{{#workflow-version-link workflowVersion}}link text{{/workflow-version-link}}`);
  assert.equal(this.$('a').attr('href').trim(), '/workflows/333/versions/111');
  assert.equal(this.$('.workflow-version-link-text').text().trim(), 'link text');
});
