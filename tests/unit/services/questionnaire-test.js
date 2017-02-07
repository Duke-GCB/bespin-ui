import { moduleFor, test } from 'ember-qunit';
import StoreStub from '../../helpers/store-stub';

moduleFor('service:questionnaire', 'Unit | Service | questionnaire', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  beforeEach: function () {
    this.register('service:store', StoreStub);
    this.inject.service('store', {as: 'store'});
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  assert.ok('true');
  let store = StoreStub.create();
  let questionnaire = Ember.Object.create();
  let questionnaireService = this.subject();
  let qutil = questionnaireService.factory(questionnaire);
  assert.ok(qutil);
});
