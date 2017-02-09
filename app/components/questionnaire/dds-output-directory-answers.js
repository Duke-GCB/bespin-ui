import Ember from 'ember';

const DDSOutputDirectoryAnswers = Ember.Component.extend({
  ddsProjects: Ember.inject.service(),
  ddsUserCredentials: Ember.inject.service(),
  projects: Ember.computed.alias('ddsProjects.projects'),
  primaryCredential: Ember.computed.alias('ddsUserCredentials.primaryCredential'),
  answerValuePairs: [],
  project: null, // Required for a dds-project-files-picker but not bound
});

DDSOutputDirectoryAnswers.reopenClass({
  positionalParams: ['answerValuePairs']
});

export default DDSOutputDirectoryAnswers;
