import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('questionnaire/fastq-file-pair-row', 'Integration | Component | questionnaire/fastq file pair row', {
  integration: true
});

test('it renders multiple ddsFiles from the pair', function(assert) {
  const pair = Ember.Object.create({
    name: 'pairName',
    ddsFiles: [
      { name: 'pairFile1' },
      { name: 'pairFile2' }
    ]
  });
  this.set('pair', pair);
  this.render(hbs`{{questionnaire/fastq-file-pair-row pair}}`);
  assert.equal(this.$('.file-group-file').length, 2);
  assert.equal(this.$('.file-group-file').eq(0).text().trim(), 'pairFile1');
  assert.equal(this.$('.file-group-file').eq(1).text().trim(), 'pairFile2');
});

// TODO: test that editing names are reflected
