import Ember from 'ember';

const JobInputFileList = Ember.Component.extend({
  files: null,
  source: '',
  tagName: 'div',
  classNames: ['panel','panel-default','file-list-panel']
});

JobInputFileList.reopenClass({
  positionalParams: ['files', 'source']
});

export default JobInputFileList;
