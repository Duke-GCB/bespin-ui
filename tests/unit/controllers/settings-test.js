import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:settings', 'Unit | Controller | settings', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it computes token based on model.tokens', function(assert) {
  let controller = this.subject({
    model: {
      tokens: Ember.A([Ember.Object.create({id: '123'})])
    }
  });
  assert.equal(controller.get('token.id'), '123', 'token is the first item in the array returned by model.tokens');
});

test('it has a generateToken action', function(assert) {
  assert.expect(2);
  let controller = this.subject({
    model: {
      tokens: Ember.A([Ember.Object.create({id: '123'})])
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
  let controller = this.subject({
    model: {
      tokens: Ember.A([Ember.Object.create({id: '123'})])
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
