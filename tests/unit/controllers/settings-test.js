import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | settings', function(hooks) {
  setupTest(hooks);

  test('it computes showGenerateTokenButton based on model.tokens.firstObject', function(assert) {
    let controller = this.owner.factoryFor('controller:settings').create({
      model: {
        tokens: A([EmberObject.create({id: '123'})])
      }
    });
    assert.equal(controller.get('showGenerateTokenButton'), false, 'showGenerateTokenButton is false if a token exists');
    controller.set('model.tokens', A());
    assert.equal(controller.get('showGenerateTokenButton'), true, 'showGenerateTokenButton is true if no token exists');
  });

  test('it has a generateToken action', function(assert) {
    assert.expect(2);
    let controller = this.owner.factoryFor('controller:settings').create({
      model: {
        tokens: A([EmberObject.create({id: '123'})])
      },
      store: {
        createRecord(modelName) {
          assert.equal(modelName, 'token');
          return {
            save() {
              assert.ok(true);
            }
          }
        }
      }
    });
    controller.send('generateToken');
  });

  test('it has a deleteToken action', function(assert) {
    assert.expect(2);
    let controller = this.owner.factoryFor('controller:settings').create({
      model: {
        tokens: A([EmberObject.create({id: '123'})])
      }
    });
    let someToken = {
      deleteRecord() {
        assert.ok(true);
      },
      save() {
        assert.ok(true);
      }
    };
    controller.send('deleteToken', someToken);
  });
});
