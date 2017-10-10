import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-output-readme', 'Integration | Component | job output readme', {
  integration: true
});

test('it renders loading', function(assert) {
  this.render(hbs`{{job-output-readme loading=true}}`);
  assert.equal(this.$().text().trim(), 'Loading...');

  // Template block usage:
  this.render(hbs`
    {{#job-output-readme loading=true}}
      template block text
    {{/job-output-readme}}
  `);
  assert.equal(this.$().text().trim().replace(/ +/, ''), 'Loading...\ntemplate block text');
});

test('it renders content for readme', function(assert) {
  this.set('readmeMarkdown', "Stuff");
  this.render(hbs`{{job-output-readme readmeMarkdown=readmeMarkdown loading=false}}`);
  assert.equal(this.$().text().trim(), 'Stuff');
});
