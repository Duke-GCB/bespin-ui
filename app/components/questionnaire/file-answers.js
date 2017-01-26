import Ember from 'ember';

const FileAnswers = Ember.Component.extend({
  occurs: 0
});

FileAnswers.reopenClass({
  positionalParams: ['occurs']
});

export default FileAnswers;
