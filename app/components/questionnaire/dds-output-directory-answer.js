import Ember from 'ember';

const DDSOutputDirectoryAnswer = Ember.Component.extend({
  projects: [], // pass down to picker
  ddsUserCredentials: null,
  answerValuePair: null,
  update(project, directoryName) {
    let ddsOutputDirectoryAnswer = this.get('answerValuePair.jobAnswerValue');
    ddsOutputDirectoryAnswer.setProperties({
      project: project,
      directoryName: directoryName,
      ddsUserCredentials: this.get('ddsUserCredentials')
    });
  },
  actions: {
    changed(project, directoryName) {
      this.update(project, directoryName);
    }
  },
});

DDSOutputDirectoryAnswer.reopenClass({
  positionalParams: ['answerValuePair', 'projects', 'ddsUserCredentials']
});

export default DDSOutputDirectoryAnswer
