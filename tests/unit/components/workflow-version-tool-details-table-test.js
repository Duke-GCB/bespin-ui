import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | workflow version tool details table', function(hooks) {
  setupTest(hooks);

  test('it sorts by tool_name', function(assert) {
    const TestDetails = {
      details: [{tool_name: 'a'}, {tool_name: 'd'}, {tool_name: 'c'}, {tool_name: 'b'}]
    };
    const component = this.owner.factoryFor('component:workflow-version-tool-details-table').create({toolDetails: TestDetails});
    const rows = component.get('rows');
    const names = rows.mapBy('tool_name').join('');
    assert.equal(names, 'abcd');
  });
});
