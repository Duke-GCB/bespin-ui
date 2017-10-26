import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('questionnaire/fastq-file-pair-row', 'Integration | Component | questionnaire/fastq file pair row', {
  integration: true
});

test('it renders both files from the pair', function(assert) {
  const pair = Ember.Object.create({
    name: 'pairName',
    file1: { name: 'pairFile1' },
    file2: { name: 'pairFile2' }
  });
  this.set('pair', pair);
  this.render(hbs`{{questionnaire/fastq-file-pair-row pair}}`);
  assert.equal(this.$('.file-group-file').length, 2);
  assert.equal(this.$('.file-group-file').eq(0).text().trim(), 'pairFile1');
  assert.equal(this.$('.file-group-file').eq(1).text().trim(), 'pairFile2');
});

test('it does not render empty files from the pair', function(assert) {
  const pair = Ember.Object.create({
    name: 'pairName',
    file1: { name: 'pairFile1' },
    file2: null,
  });
  Ember.run(() => {
    this.set('pair', pair);
    this.render(hbs`{{questionnaire/fastq-file-pair-row pair}}`);
    assert.equal(this.$('.file-group-file').length, 1);
    assert.equal(this.$('.file-group-file').eq(0).text().trim(), 'pairFile1');

    pair.set('file1', null);
    pair.set('file2', {name: 'pairFile2'});
    this.render(hbs`{{questionnaire/fastq-file-pair-row pair}}`);
    assert.equal(this.$('.file-group-file').length, 1);

    // Do not render the first file when not set
    assert.equal(this.$('.file-group-file').eq(0).text().trim(), 'pairFile2');
  });
});
