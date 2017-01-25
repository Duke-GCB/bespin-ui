import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('job-question', 'Unit | Model | job question', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it computes isFile', function(assert) {
  assert.expect(2);
  let model = this.subject();
  Ember.run(function() {
    model.set('dataType', 'File');
    assert.ok(model.get('isFile'));
    model.set('dataType', 'NotFile');
    assert.notOk(model.get('isFile'));
  });
});
