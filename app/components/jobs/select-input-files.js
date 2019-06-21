import Component from '@ember/component';

const SelectInputFiles = Component.extend({
  project: null,
  pickedFiles: null
});

SelectInputFiles.reopenClass({
  positionalParams: ['projects', 'pickedFiles']
});

export default SelectInputFiles;
