import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-title-link', 'Integration | Component | workflow title link', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('myworkflow', {
    name: 'Exomeseq',
  });


  this.render(hbs`{{workflow-title-link workflow=myworkflow}}`);
  assert.equal(this.$().text().trim().replace(/ /g,''), 'Workflow:\nExomeseq');

  // Template block usage:
  this.render(hbs`
    {{#workflow-title-link}}
      <p>template block text</p>
    {{/workflow-title-link}}
  `);

  assert.equal(this.$("p").text().trim(), 'template block text');

});
