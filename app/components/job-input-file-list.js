import Component from '@ember/component';

const JobInputFileList = Component.extend({
  files: null,
  source: '',
  tagName: 'div',
  classNames: ['panel','panel-default','file-list-panel']
});

JobInputFileList.reopenClass({
  positionalParams: ['files', 'source']
});

export default JobInputFileList;
