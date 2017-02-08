import Ember from 'ember';

const DDSFileAnswer = Ember.Component.extend({
  ddsProjects: Ember.inject.service(),
  ddsUserCredentials: Ember.inject.service(),
  projects: Ember.computed.alias('ddsProjects.projects'),
  answerValuePairs: [],
  pickedFiles: [], // Initial value, can be passed by name
  project: null, // Required for a dds-project-files-picker but not bound
  actions: {
    filesChanged(pickedFiles) {
      // merge our picked files into answer values
      let answerValuePairs = this.get('answerValuePairs');
      let credentials = this.get('ddsUserCredentials.primaryCredential');
      answerValuePairs.forEach(function(answerValuePair, index) {
        let jobAnswerValue = answerValuePair.get('jobAnswerValue');
        if(index < pickedFiles.length) {
          let pickedFile = pickedFiles[index];
          jobAnswerValue.setProperties({
            project: pickedFile.get('project'),
            file: pickedFile,
            ddsUserCredentials: credentials
          });
        } else {
          jobAnswerValue.setProperties({
            project: null,
            file: null,
            ddsUserCredentials: null
          });
        }
      });
    },
  }
});

DDSFileAnswer.reopenClass({
  positionalParams: ['answerValuePairs']
});

export default DDSFileAnswer;
