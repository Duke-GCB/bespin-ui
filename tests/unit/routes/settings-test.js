import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | settings', function(hooks) {
  setupTest(hooks);

  test('it creates a model that contains an array of tokens', function(assert) {
    assert.expect(4);
    let route = this.owner.factoryFor('route:settings').create({
      store: {
        findAll(modelName) {
          assert.equal(modelName, 'token');
          return [
            EmberObject.create({id: 123}),
            EmberObject.create({id: 456}),
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
});
