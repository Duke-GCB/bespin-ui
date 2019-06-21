import { run } from '@ember/runloop';
import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | questionnaire/dds project field', function(hooks) {
  setupTest(hooks);

  test('didInsertElement populates credential and projects', function(assert) {
    // Creates the component instance
    const component = this.owner.factoryFor('component:questionnaire/dds-project-field').create();
    const ddsProjects = {
      projects: function () {
        return resolve('someprojects');
      }
    };
    const ddsUserCredentials = {
      primaryCredential: function () {
        return resolve('somecredentials');
      }
    };
    component.set('ddsProjects', ddsProjects);
    component.set('ddsUserCredentials', ddsUserCredentials);

    assert.equal(component.get('credential'), null);
    assert.equal(component.get('projects'), null);

    run(() => {
      component.didInsertElement();
    });

    assert.equal(component.get('credential'), 'somecredentials');
    assert.equal(component.get('projects'), 'someprojects');
  });
});
