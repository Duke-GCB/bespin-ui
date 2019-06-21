import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | questionnaire/fastq file pair row', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders multiple ddsFiles from the pair', async function(assert) {
    const pair = EmberObject.create({
      sampleName: 'Sample A',
      ddsFiles: [
        { name: 'pairFile1' },
        { name: 'pairFile2' }
      ]
    });
    this.set('pair', pair);
    await render(hbs`{{questionnaire/fastq-file-pair-row pair}}`);
    assert.equal(this.$('input.form-control').val(), 'Sample A');
    assert.equal(this.$('.file-group-file').length, 2);
    assert.equal(this.$('.file-group-file').eq(0).text().trim(), 'pairFile1');
    assert.equal(this.$('.file-group-file').eq(1).text().trim(), 'pairFile2');
  });

  test('editing the sample name on the form is reflected in the pair', async function(assert) {
    const pair = EmberObject.create({
      sampleName: 'Original Name',
      ddsFiles: [
        { name: 'pairFile1' },
        { name: 'pairFile2' }
      ]
    });
    this.set('pair', pair);
    await render(hbs`{{questionnaire/fastq-file-pair-row pair}}`);
    assert.equal(this.$('input.form-control').val(), 'Original Name');
    // Now "type" a new name
    this.$('input.form-control').val('Updated Name').change();
    assert.equal(pair.get('sampleName'), 'Updated Name');
  });
});
