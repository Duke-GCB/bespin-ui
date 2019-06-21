import Component from '@ember/component';

const FileGroupFile = Component.extend({
  file: null, // A dds-resource
  tagName: 'li',
  classNames: ['file-group-file'],
  index: 0,
  onClick: () => {},
  actions: {
    click() {
      // Here we must send the index back of the component, so we know which file item to remove
      this.get('onClick')(this.get('index'));
    },
  }
});

FileGroupFile.reopenClass({
  positionalParams: ['file', 'index', 'onClick']
});

export default FileGroupFile;
