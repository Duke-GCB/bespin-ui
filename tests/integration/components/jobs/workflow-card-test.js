import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jobs/workflow-card', 'Integration | Component | jobs/workflow card', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{jobs/workflow-card}}`);

  assert.equal(this.$('.jobs-workflow-card-browse-versions').text().trim(), 'Browse All Versions');
  assert.equal(this.$('input').attr('type'), 'radio');

  // Template block usage:
  this.render(hbs`
    {{#jobs/workflow-card}}
      template block text
    {{/jobs/workflow-card}}
  `);

  assert.equal(this.$('.jobs-workflow-card-browse-versions').text().trim(), 'Browse All Versions');
  assert.equal(this.$('input').attr('type'), 'radio');
});
