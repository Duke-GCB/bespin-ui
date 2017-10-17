import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/fastq-file-pair-row', 'Integration | Component | questionnaire/fastq file pair row', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{questionnaire/fastq-file-pair-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#questionnaire/fastq-file-pair-row}}
      template block text
    {{/questionnaire/fastq-file-pair-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
