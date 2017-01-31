import Ember from 'ember';

const DDSFileAnswer = Ember.Component.extend({
  store: Ember.inject.service(), // Needs to load dds-projects from the store.
  pickedFiles: [], // Initial value, can be passed by name
  answerValues: [], // Array of job-dds-file-answers
  project: null, // Required for a dds-project-files-picker but not bound
  // Is this going to be used?
  isValid: Ember.computed('pickedFiles.length', 'answerValues.length', function() {
    let isValid = this.get('answerValues.length') === this.get('pickedFiles.length');
    return isValid;
  }),
  loadProjects() {
    this.set('projects', this.get('store').findAll('dds-project'));
  },
  loadCredentials() {
    this.set('ddsUserCredentials', this.get('store').findAll('dds-user-credential'));
  },
  didReceiveAttrs() {
    this._super(...arguments);
    this.loadProjects();
    this.loadCredentials();
  },
  actions: {
    filesChanged(pickedFiles) {
      let store = this.get('store');
      // merge our picked files into answer values
      let answerValues = this.get('answerValues');
      let credentials = this.get('ddsUserCredentials');
      answerValues.forEach(function(answerValue, index) {
        if(index < pickedFiles.length) {
          let pickedFile = pickedFiles[index];
          answerValue.set('project', pickedFile.get('project'));
          answerValue.set('file', pickedFile);
          answerValue.set('ddsUserCredentials', credentials);
        } else {
          answerValue.set('project', null);
          answerValue.set('file', null);
          answerValue.set('ddsUserCredentials', null);
        }
      });
    },
  }
});

DDSFileAnswer.reopenClass({
  positionalParams: ['answerValues']
});

export default DDSFileAnswer;
