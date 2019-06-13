import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('workflows/workflow-detail', 'Unit | Component | workflows/workflow detail', {
  unit: true
});

test('it sorts versions with newest first', function(assert) {
  const versions = [
    {versionSort: '000v2'},
    {versionSort: '000v3'},
    {versionSort: '00v10'},
    {versionSort: '000v5'},
    {versionSort: '000v1'},
    {versionSort: '000v4'}];
  const workflow = {versions: versions};
  const component = this.subject({workflow: workflow});
  const sortedVersions = component.get('sortedVersionsNewestFirst');
  const stringVersions = sortedVersions.mapBy('versionSort').join(',');
  assert.equal(stringVersions, '00v10,000v5,000v4,000v3,000v2,000v1');
});
