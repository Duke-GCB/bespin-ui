import Ember from 'ember';

const DDSFileAnswer = Ember.Component.extend({
  store: Ember.inject.service(), // Needs to load dds-projects from the store.
  answerValuePairs: [],
  pickedFiles: [], // Initial value, can be passed by name
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
  },
  actions: {
    filesChanged(pickedFiles) {
      // merge our picked files into answer values
      let answerValuePairs = this.get('answerValuePairs');
      let credentials = this.get('ddsUserCredentials');
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
