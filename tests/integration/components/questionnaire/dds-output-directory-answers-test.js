import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const storeStub = Ember.Service.extend({
  callCount: 0,
  modelsCalled: [],
  findAll(modelName) {
    this.get('modelsCalled').push(modelName);
    this.set('callCount', this.get('callCount') + 1);
    return new Ember.RSVP.Promise(function (resolve) {
      resolve([{id:'abc-123', kind: modelName}]);
    });
  }
});

moduleForComponent('questionnaire/dds-output-directory-answers', 'Integration | Component | questionnaire/dds output directory answers', {
  integration: true,
  beforeEach: function() {
    this.register('service:store', storeStub);
    this.inject.service('store', {as: 'store'});
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{questionnaire/dds-output-directory-answers label='Output Directory'}}`);
  assert.equal(this.$('label').text().trim(), 'Output Directory');
});

test('it fetches projects and credentials', function(assert) {
  let store = this.get('store');
  this.render(hbs`{{questionnaire/dds-file-answers}}`);
  assert.equal(store.get('callCount'), 2);
  // assert.equal with the array is triggering some unrecognizable error
  assert.equal(store.get('modelsCalled')[0], 'dds-project');
  assert.equal(store.get('modelsCalled')[1], 'dds-user-credential');
});
