import Ember from 'ember';

const DDSFileAnswer = Ember.Component.extend({
  pickedFiles: [],
  project: null, // Required for a dds-project-files-picker but not bound
  store: Ember.inject.service(), // Needs to load dds-projects from the store.
  isValid: Ember.computed('pickedFiles.length', 'occurs', function() {
    let isValid = this.get('occurs') === this.get('pickedFiles.length');
    Ember.Logger.log(`isValid: ${isValid}`);
    return isValid;
  }),
  answers: Ember.computed('pickedFiles[]', function() {
    Ember.Logger.log('regenerating answers from pickedFiles');
    let store = this.get('store');
    let pickedFiles = this.get('pickedFiles');
    let credential = this.get('ddsUserCredentials').get('firstObject');
    let list = pickedFiles.map(function(pickedFile) {
      let typedJobAnswer = store.createRecord('job-dds-file-answer', {
        answer: null, // For some reason this is filled out above
        project: pickedFile.get('project'),
        file: pickedFile,
        ddsUserCredentials: credential
      });
      return typedJobAnswer;
    });
    return list;
  }),
  loadProjects() {
    this.set('projects', this.get('store').findAll('dds-project'));
  },
  loadCredentials() {
    this.set('ddsUserCredentials', this.get('store').findAll('dds-user-credential'));
  },
  onAnswer: null, // callbacks provided on init
  onCancel: null, // callbacks provided on init
  didReceiveAttrs() {
    this._super(...arguments);
    this.loadProjects();
    this.loadCredentials();
  },
  actions: {
    cancel() {
      this.get('onCancel')();
    },
    next() {
      if(this.get('isValid')) {
        // calls questionRow.answered(typedJobAnswers, kind)
        this.get('onAnswer')(this.get('answers'), 'dds_file');
      }
    }
  }
});

DDSFileAnswer.reopenClass({
  positionalParams: ['occurs', 'onAnswer', 'onCancel']
});

export default DDSFileAnswer;
