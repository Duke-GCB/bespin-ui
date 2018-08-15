import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:settings', 'Unit | Route | settings', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:session']
});

test('it creates a model that contains an array of tokens', function(assert) {
  assert.expect(4);
  let route = this.subject({
    store: {
      findAll(modelName) {
        assert.equal(modelName, 'token');
        return [
          Ember.Object.create({id: 123}),
          Ember.Object.create({id: 456}),
        ];
      }
    }
  });
  let modelPromise = route.model();
  modelPromise.then(function (resolvedModel) {
    assert.equal(resolvedModel.tokens.length, 2);
    assert.equal(resolvedModel.tokens[0].get('id'), 123);
    assert.equal(resolvedModel.tokens[1].get('id'), 456);
  });
});
