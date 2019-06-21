import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | workflows/versions/index', function(hooks) {
  setupTest(hooks);

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
    let route = this.owner.lookup('route:workflows/versions/index');
    route.paramsFor = mockParamsFor;
    route.get('store').query = mockQuery;
    assert.ok(route);
    route.model();
  });
});
