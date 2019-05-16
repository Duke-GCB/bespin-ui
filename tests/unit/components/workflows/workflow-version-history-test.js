import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('workflows/workflow-version-history', 'Unit | Component | workflows/workflow version history', {
  unit: true,
});

test('loadVersionInfo calls getVersionInfo and decodes content', function(assert) {
  const encodedContent = btoa('Version Info Content');
  const workflowVersion = Ember.Object.create({
    getVersionInfo() {
      assert.step('getVersionInfo');
      const versionInfo = {content: encodedContent};
      return Ember.RSVP.resolve(versionInfo);
    }
  });

  const component = this.subject({
    workflowVersion: workflowVersion
  });
  Ember.run(() => {
    assert.step('loadVersionInfo');
    component.loadVersionInfo();
  });
  assert.step('getContent');
  assert.equal(component.get('versionInfoContent'), 'Version Info Content');
  assert.verifySteps(['loadVersionInfo','getVersionInfo','getContent']);
});
