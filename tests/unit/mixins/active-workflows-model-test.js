import Ember from 'ember';
import ActiveWorkflowsModelMixin from 'bespin-ui/mixins/active-workflows-model';
import { module, test } from 'qunit';

module('Unit | Mixin | active workflows model');

test('model returns all active workflows sorted by name', function(assert) {
  let ActiveWorkflowsModelObject = Ember.Object.extend(ActiveWorkflowsModelMixin);
  let subject = ActiveWorkflowsModelObject.create({
    store: {
      findAll(recordModel) {
        return {
          then(filterFunc) {
            return filterFunc([
              Ember.Object.create({id: 1, kind: 'find_' + recordModel, isActive: true, 'name': 'Zeta'}),
              Ember.Object.create({id: 2, kind: 'find_' + recordModel, isActive: false}),
              Ember.Object.create({id: 3, kind: 'find_' + recordModel, isActive: true, 'name': 'Alpha'}),
            ])
          }
        };
      }
    }
  });
  let model = subject.model();
  assert.equal(model.length, 2);
  assert.equal(model[0].get('kind'), 'find_workflow');
  assert.equal(model[0].get('id'), 3);
  assert.equal(model[0].get('name'), 'Alpha');
  assert.equal(model[1].get('kind'), 'find_workflow');
  assert.equal(model[1].get('id'), 1);
  assert.equal(model[1].get('name'), 'Zeta');
});
