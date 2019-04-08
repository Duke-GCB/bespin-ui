import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import StoreStub from '../../../helpers/store-stub';
import Ember from 'ember';

moduleForComponent('questionnaire/fastq-read-pair-list', 'Integration | Component | questionnaire/fastq read pair list', {
  integration: true,
  beforeEach: function() {
    this.register('service:store', StoreStub);
  }
});

test('it renders using the fastq-file-pair-list template', function(assert) {
  const fileItems = Ember.Object.create({
      samples: [{},{}]
    }
  );
  this.set('fileItems', fileItems);
  this.set('externalAction', () => {});
  this.render(hbs`{{questionnaire/fastq-read-pair-list "FieldName" (action externalAction) fileItems=fileItems}}`);
  assert.equal(this.$('.fastq-file-pair-row').length, 2);
  assert.equal(this.$('div.file-group-list-picker').length, 1);

});
