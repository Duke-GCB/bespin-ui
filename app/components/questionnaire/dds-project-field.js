import Ember from 'ember';

const DDSProjectField = Ember.Component.extend({
  /**
   * Base class that populates credential and projects properties based on DukeDS Services
   */
  ddsProjects: Ember.inject.service(),
  ddsUserCredentials: Ember.inject.service(),
  credential: null, // populated on didInsertElement
  projects: null, // populated on didInsertElement

  // Per https://emberigniter.com/render-promise-before-it-resolves/
  didInsertElement() {
    this._super(...arguments);
    this.get('ddsUserCredentials').primaryCredential().then(credential => {
      this.set('credential', credential);
    });
    this.get('ddsProjects').projects().then(projects => {
      this.set('projects', projects);
    });
  }
});

export default DDSProjectField;
