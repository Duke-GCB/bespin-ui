import Ember from 'ember';

const DDSOutputDirectoryAnswers = Ember.Component.extend({
  store: Ember.inject.service(), // Needs to load dds-projects from the store.
  answerValuePairs: [],
  project: null, // Required for a dds-project-files-picker but not bound
  load() {
    this.get('store').findAll('dds-project').then(projects => {
      this.set('projects', projects);
    });
    this.get('store').findAll('dds-user-credential').then(credentials => {
      this.set('ddsUserCredentials', credentials.get('firstObject'));
    });
  },
  didReceiveAttrs() {
    this._super(...arguments);
    this.load();
  }
});

DDSOutputDirectoryAnswers.reopenClass({
  positionalParams: ['answerValuePairs']
});

export default DDSOutputDirectoryAnswers;
