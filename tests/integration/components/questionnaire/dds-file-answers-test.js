import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import StoreStub from '../../../helpers/store-stub';

moduleForComponent('questionnaire/dds-file-answer', 'Integration | Component | questionnaire/dds file answers', {
  integration: true,
  beforeEach: function() {
    this.register('service:store', StoreStub);
    this.inject.service('store', {as: 'store'});
    this.get('store').reset();
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{questionnaire/dds-file-answers label='Label'}}`);
  assert.equal(this.$('label').text(), 'Label');
});

test('it fetches projects and credentials', function(assert) {
  this.render(hbs`{{questionnaire/dds-file-answers}}`);
  assert.equal(this.get('store.findCount'), 2);
  assert.equal(this.get('store.findCalls')[0], 'dds-project');
  assert.equal(this.get('store.findCalls')[1], 'dds-user-credential');
});
