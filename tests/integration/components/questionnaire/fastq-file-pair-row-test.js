import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('questionnaire/fastq-file-pair-row', 'Integration | Component | questionnaire/fastq file pair row', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{questionnaire/fastq-file-pair-row}}`);
  assert.ok(true);
  //TODO: Write test
});
