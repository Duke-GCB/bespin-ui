import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('workflow-version-tool-details-table', 'Unit | Component | workflow version tool details table', {
  unit: true
});

test('it sorts by tool_name', function(assert) {
  const TestDetails = {
    details: [{tool_name: 'a'}, {tool_name: 'd'}, {tool_name: 'c'}, {tool_name: 'b'}]
  };
  const component = this.subject({toolDetails: TestDetails});
  const rows = component.get('rows');
  const names = rows.mapBy('tool_name').join('');
  assert.equal(names, 'abcd');
});
