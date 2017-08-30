import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobs/workflow-version-card', 'Integration | Component | jobs/workflow version card', {
  integration: true
});

test('it renders', function(assert) {

  this.set('workflowVersion', {
      workflow: {name: 'Exome Seq'},
      version: '1'
    }
  );

  this.render(hbs`{{jobs/workflow-version-card workflowVersion=workflowVersion}}`);

  assert.equal(this.$('.jobs-workflow-version-card-title').text().trim(), 'Exome Seq');
  assert.equal(this.$('.jobs-workflow-version-card-version').text().trim(), 'v1');
  assert.equal(this.$('input').attr('type'), 'radio');

  // Template block usage:
  this.render(hbs`
    {{#jobs/workflow-version-card}}
      template block text
    {{/jobs/workflow-version-card}}
  `);

  assert.equal(this.$('.panel-body').text().trim(), 'template block text');

});
