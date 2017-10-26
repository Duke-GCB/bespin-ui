import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import StoreStub from '../../../helpers/store-stub';
import Ember from 'ember';

moduleForComponent('questionnaire/fastq-file-pair-list', 'Integration | Component | questionnaire/fastq file pair list', {
  integration: true,
  beforeEach: function() {
    this.register('service:store', StoreStub);
  }
});

test('it shows/hides errors based on answerFormErrors.show', function(assert) {
  this.set('fieldName', 'field-name');
  this.set('answerFormErrors', Ember.Object.create({
    show: true,
    errors: [{field: 'field-name', message: 'Error Message'}],
    setError() { }
  }));
  this.render(hbs`{{questionnaire/fastq-file-pair-list fieldName=fieldName answerFormErrors=answerFormErrors }}`);
  assert.equal(this.$('.error-panel').text().trim(), 'Error Message');

  this.set('answerFormErrors.show', false);
  this.render(hbs`{{questionnaire/fastq-file-pair-list fieldName=fieldName answerFormErrors=answerFormErrors }}`);
  assert.equal(this.$('.error-panel').text().trim(), '');
});

test('it renders a fastq-file-pair-row for each selected pair', function(assert) {
  const fileItems = Ember.Object.create({
      fastqFilePairs: [{},{}]
    }
  );
  this.set('fileItems', fileItems);
  this.render(hbs`{{questionnaire/fastq-file-pair-list fileItems=fileItems}}`);
  assert.equal(this.$('.fastq-file-pair-row').length, 2)
});
