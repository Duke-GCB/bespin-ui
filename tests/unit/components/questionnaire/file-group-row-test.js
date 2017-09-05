import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('questionnaire/file-group-row', 'Unit | Component | questionnaire/file group row', {
  unit: true
});

test('it renders', function(assert) {
  this.render();
  assert.equal(this.$().text().trim(), 'Group 1');
});

test('calls onClick action with its group index and clicked index', function (assert) {
  const onClick = (groupIndex, index) => {
    assert.equal(groupIndex, 3);
    assert.equal(index, 9);
  };
  const component = this.subject({groupIndex: 3, onClick: onClick});
  component.send('click', 9);
});
