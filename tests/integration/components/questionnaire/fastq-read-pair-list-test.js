import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import StoreStub from '../../../helpers/store-stub';

module('Integration | Component | questionnaire/fastq read pair list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:store', StoreStub);
  });

  test('it renders using the fastq-file-pair-list template', async function(assert) {
    const fileItems = EmberObject.create({
        samples: [{},{}]
      }
    );
    this.set('fileItems', fileItems);
    this.set('externalAction', () => {});
    await render(hbs`{{questionnaire/fastq-read-pair-list "FieldName" (action externalAction) fileItems=fileItems}}`);
    assert.equal(this.$('.fastq-file-pair-row').length, 2);
    assert.equal(this.$('div.file-group-list-picker').length, 1);

  });

  test('It shows the featureSupportMessage', async function(assert) {
    const fileItems = EmberObject.create({
        samples: [{},{}]
      }
    );
    this.set('fileItems', fileItems);
    this.set('externalAction', () => {});
    await render(hbs`{{questionnaire/fastq-read-pair-list "FieldName" (action externalAction) fileItems=fileItems}}`);
    assert.equal(this.$('.feature-support-message').length, 1);
  });
});
