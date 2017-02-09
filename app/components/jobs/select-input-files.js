import Ember from 'ember';

const SelectInputFiles = Ember.Component.extend({
  project: null,
  pickedFiles: null
});

SelectInputFiles.reopenClass({
  positionalParams: ['projects', 'pickedFiles']
});

export default SelectInputFiles;
