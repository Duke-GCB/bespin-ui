import { run } from '@ember/runloop';
import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | workflows/workflow version history', function(hooks) {
  setupTest(hooks);

  test('loadVersionInfo calls getVersionInfo and decodes content', function(assert) {
    const encodedContent = btoa('Version Info Content');
    const workflowVersion = EmberObject.create({
      getVersionInfo() {
        assert.step('getVersionInfo');
        const versionInfo = {content: encodedContent};
        return resolve(versionInfo);
      }
    });

    const component = this.owner.factoryFor('component:workflows/workflow-version-history').create({
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
});
