import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('workflows/workflow-detail', 'Unit | Component | workflows/workflow detail', {
  unit: true
});

test('it sorts simple versions with newest first', function(assert) {
  const versions = [{version:'v2'}, {version: 'v3'}, {version: 'v5'}, {version: 'v1'}, {version: 'v4'}];
  const workflow = {versions: versions};
  const component = this.subject({workflow: workflow});
  const sortedVersions = component.get('sortedVersionsNewestFirst');
  const stringVersions = sortedVersions.mapBy('version').join(',');
  assert.equal(stringVersions, 'v5,v4,v3,v2,v1');
});

test('it sorts complex version strings with newest first', function(assert) {
  const versions = [{version:'v9.0.2'}, {version: 'v1.0-dev2'}, {version: 'v0.1'}, {version: 'v4.3'}];
  const workflow = {versions: versions};
  const component = this.subject({workflow: workflow});
  const sortedVersions = component.get('sortedVersionsNewestFirst');
  const stringVersions = sortedVersions.mapBy('version').join(',');
  assert.equal(stringVersions, 'v9.0.2,v4.3,v1.0-dev2,v0.1');
});
