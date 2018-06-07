import { moduleForComponent, test } from 'ember-qunit';
import Ember from "ember";

moduleForComponent('questionnaire/dds-project-field', 'Unit | Component | questionnaire/dds project field', {
  // Specify the other units that are required for this test
  needs: ['service:ddsProjects', 'service:ddsUserCredentials', 'model:dds-user-credential', 'model:dds-project'],
  unit: true
});

test('didInsertElement populates credential and projects', function(assert) {
  // Creates the component instance
  const component = this.subject();
  const ddsProjects = {
    projects: function () {
      return Ember.RSVP.resolve('someprojects')
    }
  };
  const ddsUserCredentials = {
    primaryCredential: function () {
      return Ember.RSVP.resolve('somecredentials');
    }
  };
  component.set('ddsProjects', ddsProjects);
  component.set('ddsUserCredentials', ddsUserCredentials);

  assert.equal(component.get('credential'), null);
  assert.equal(component.get('projects'), null);

  Ember.run(() => {
    component.didInsertElement();
  });

  assert.equal(component.get('credential'), 'somecredentials');
  assert.equal(component.get('projects'), 'someprojects');
});
