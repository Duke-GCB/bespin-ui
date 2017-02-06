import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('questionnaire/dds-file-answer', 'Integration | Component | questionnaire/dds file answers', {
  integration: true,
  beforeEach: function() {
    this.set('store', Ember.Object.create({
      callCount: 0,
      modelsCalled: [],
      findAll(modelName) {
        // For projects!
        this.get('modelsCalled').push(modelName);
        this.set('callCount', this.get('callCount') + 1);
        return new Ember.RSVP.Promise(function (resolve) {
          resolve([{id:'abc-123', kind: modelName}]);
        });
      },
    }));
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{questionnaire/dds-file-answers label='Label' store=store}}`);
  assert.equal(this.$('label').text(), 'Label');
});

test('it fetches projects and credentials', function(assert) {
  let store = this.get('store');
  this.render(hbs`{{questionnaire/dds-file-answers store=store}}`);
  assert.equal(store.get('callCount'), 2);
  // assert.equal with the array is triggering some unrecognizable error
  assert.equal(store.get('modelsCalled')[0], 'dds-project');
  assert.equal(store.get('modelsCalled')[1], 'dds-user-credential');
});
