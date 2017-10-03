import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('dds/dds-project-files-picker', 'Unit | Component | dds/dds project files picker', {
  unit: true
});

test('it computes isLoading', function(assert) {
  let component = this.subject({projects: null});
  assert.ok(component.get('isLoading'));
  component.set('projects', [1,2,3]);
  assert.notOk(component.get('isLoading'));
});

test('it computes isEmpty', function(assert) {
  let component = this.subject({projects: []});
  assert.ok(component.get('isEmpty'));
  component.set('projects', [1,2,3]);
  assert.notOk(component.get('isEMpty'));
});
