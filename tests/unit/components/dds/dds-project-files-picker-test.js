import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | dds/dds project files picker', function(hooks) {
  setupTest(hooks);

  test('it computes isLoading', function(assert) {
    let component = this.owner.factoryFor('component:dds/dds-project-files-picker').create({projects: null});
    assert.ok(component.get('isLoading'));
    component.set('projects', [1,2,3]);
    assert.notOk(component.get('isLoading'));
  });

  test('it computes isEmpty', function(assert) {
    let component = this.owner.factoryFor('component:dds/dds-project-files-picker').create({projects: []});
    assert.ok(component.get('isEmpty'));
    component.set('projects', [1,2,3]);
    assert.notOk(component.get('isEMpty'));
  });
});
