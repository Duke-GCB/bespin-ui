import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import StoreStub from '../../../helpers/store-stub';

moduleForComponent('questionnaire/directory-answers', 'Integration | Component | questionnaire/directory answers', {
  integration: true,
  beforeEach: function() {
    this.register('service:store', StoreStub);
    this.inject.service('store', {as: 'store'});
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{questionnaire/directory-answers}}`);
  assert.equal(this.$().text().trim(), '');
});
