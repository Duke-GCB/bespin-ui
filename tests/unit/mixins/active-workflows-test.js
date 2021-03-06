import Ember from 'ember';
import ActiveWorkflowsMixin from 'bespin-ui/mixins/active-workflows';
import { module, test } from 'qunit';

module('Unit | Mixin | active workflows');

test('model method returns all active workflows sorted by name', function(assert) {
  let ActiveWorkflowsObject = Ember.Object.extend(ActiveWorkflowsMixin);
  let subject = ActiveWorkflowsObject.create({
    store: {
      findAll(recordModel) {
        return Ember.RSVP.resolve([
            Ember.Object.create({id: 1, kind: 'find_' + recordModel, isActive: true, 'name': 'Zeta'}),
            Ember.Object.create({id: 2, kind: 'find_' + recordModel, isActive: false}),
            Ember.Object.create({id: 3, kind: 'find_' + recordModel, isActive: true, 'name': 'Alpha'})
        ]);
      }
    }
  });
  subject.model().then(function (model) {
    assert.equal(model.length, 2);
    assert.equal(model[0].get('kind'), 'find_workflow');
    assert.equal(model[0].get('id'), 3);
    assert.equal(model[0].get('name'), 'Alpha');
    assert.equal(model[1].get('kind'), 'find_workflow');
    assert.equal(model[1].get('id'), 1);
    assert.equal(model[1].get('name'), 'Zeta');
  });
});
