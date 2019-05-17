import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('workflows/workflow-detail', 'Unit | Component | workflows/workflow detail', {
  unit: true
});

test('it sorts versions with newest first', function(assert) {
  const versions = [{version:'v2'}, {version: 'v3'}, {version: 'v5'}, {version: 'v1'}, {version: 'v4'}];
  const workflow = {versions: versions};
  const component = this.subject({workflow: workflow});
  const sortedVersions = component.get('sortedVersionsNewestFirst');
  const stringVersions = sortedVersions.mapBy('version').join(',');
  assert.equal(stringVersions, 'v5,v4,v3,v2,v1');
});
