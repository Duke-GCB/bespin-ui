import { run } from '@ember/runloop';
import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('workflows/workflow-version-history', 'Unit | Component | workflows/workflow version history', {
  unit: true,
});

test('loadVersionInfo calls getVersionInfo and decodes content', function(assert) {
  const encodedContent = btoa('Version Info Content');
  const workflowVersion = EmberObject.create({
    getVersionInfo() {
      assert.step('getVersionInfo');
      const versionInfo = {content: encodedContent};
      return resolve(versionInfo);
    }
  });

  const component = this.subject({
    workflowVersion: workflowVersion
  });
  run(() => {
    assert.step('loadVersionInfo');
    component.loadVersionInfo();
  });
  assert.step('getContent');
  assert.equal(component.get('versionInfoContent'), 'Version Info Content');
  assert.verifySteps(['loadVersionInfo','getVersionInfo','getContent']);
});
