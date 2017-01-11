import Ember from 'ember';

const SelectInputFiles = Ember.Component.extend({
  project: null,
});

SelectInputFiles.reopenClass({
  positionalParams: ['projects']
});

export default SelectInputFiles;
