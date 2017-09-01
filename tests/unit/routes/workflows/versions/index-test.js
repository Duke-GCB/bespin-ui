import { moduleFor, test } from 'ember-qunit';

moduleFor('route:workflows/versions/index', 'Unit | Route | workflows/versions/index', {
  // Specify the other units that are required for this test.
  needs: ['model:workflow-version']
});

test('it exists', function(assert) {
  assert.expect(4)
  function mockParamsFor(name) {
    assert.equal(name, 'workflows.versions');
    return {
      workflow_id: 123
    };
  }
  function mockQuery(name, param) {
    assert.equal(name, 'workflow-version');
    assert.equal(param.workflow, 123);
  }
  let route = this.subject();
  route.paramsFor = mockParamsFor;
  route.get('store').query = mockQuery;
  assert.ok(route);
  route.model();
});
