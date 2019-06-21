import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | workflows/workflow detail', function(hooks) {
  setupTest(hooks);

  test('it sorts versions with newest first', function(assert) {
    const versions = [{version:'v2'}, {version: 'v3'}, {version: 'v5'}, {version: 'v1'}, {version: 'v4'}];
    const workflow = {versions: versions};
    const component = this.owner.factoryFor('component:workflows/workflow-detail').create({workflow: workflow});
    const sortedVersions = component.get('sortedVersionsNewestFirst');
    const stringVersions = sortedVersions.mapBy('version').join(',');
    assert.equal(stringVersions, 'v5,v4,v3,v2,v1');
  });
});
