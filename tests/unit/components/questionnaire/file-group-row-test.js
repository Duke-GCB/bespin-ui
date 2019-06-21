import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | questionnaire/file group row', function(hooks) {
  setupTest(hooks);

  test('it renders', function(assert) {
    this.render();
    assert.equal(this.$().text().trim(), 'Group 1');
  });

  test('groupTitle returns default or value based on groupName', function(assert) {
    const component = this.owner.factoryFor('component:questionnaire/file-group-row').create();
    assert.equal(component.get('groupTitle'), 'Group');
    component.set('groupName', 'sample');
    assert.equal(component.get('groupTitle'), 'Sample');
  });

  test('calls onClick action with its group index and clicked index', function (assert) {
    const onClick = (groupIndex, index) => {
      assert.equal(groupIndex, 3);
      assert.equal(index, 9);
    };
    const component = this.owner.factoryFor('component:questionnaire/file-group-row').create({groupIndex: 3, onClick: onClick});
    component.send('click', 9);
  });
});
