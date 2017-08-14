import Ember from 'ember';

const FileItem = Ember.Object.extend({
  ddsFile: null, // a dds-resource
  inputFile: null, // a dds-job-input-file,
  cwlFile: null, // { "class":"File", "path":"reads_0_0_S001_R1.fastq"}

  init() {
    this._super(...arguments);
    const ddsFile = this.get('ddsFile');
    const prefix = this.get('prefix');
    const credential = this.get('credential');
    this.set('inputFile', ddsFile.createJobInputFile(prefix, credential));
    this.set('cwlObject', ddsFile.cwlFileObject(prefix));
  },

  destroy() {
    this.get('inputFile').destroyRecord();
  }
});

const FileItemList = Ember.Object.extend({
  content: null,
  unique: true,
  init() {
    this._super(...arguments);
    if(Ember.isEmpty(this.get('content'))) {
      this.set('content', []);
    }
  },
  groupSize: 2,
  addFileItem(fileItem) {
    const content = this.get('content');
    const unique = this.get('unique');
    if(unique && content.includes(fileItem)) {
      // we already have this item and must be unique
      return false;
    } else {
      this.get('content').pushObject(fileItem);
    }
  },
  removeFileItem(groupIndex, fileIndex) {
    let index = this.get('groupSize') * groupIndex + fileIndex;
    this.get('content').objectAt(index).destroy();
    this.get('content').removeAt(index);
  },
  // Computed properites for presentation
  fileItemGroups: Ember.computed('content.[]', 'groupSize', function() {
    let fileCount = this.get('content.length');
    let groupSize = this.get('groupSize');
    let fileItemGroups = [];
    for(let i = 0;i < fileCount;i = i + groupSize) {
      const fileItemGroup = [];
      for(let j = i; j < i + groupSize && j < fileCount; j++){
        fileItemGroup.pushObject(this.get('content').objectAt(j));
      }
      fileItemGroups.pushObject(fileItemGroup);
    }
    return fileItemGroups;
  }),
  cwlObjectValue: Ember.computed('fileItemGroups.[]', function() {
    /*
     Example: returns CWL File[][] structure from the following read data:

     fieldName: reads
     Pair 1: S001_R1.fastq, S001_R2.fastq
     Pair 2: S002_R1.fastq, S002_R2.fastq

     Produces:

     [
       [
         { "class":"File", "path":"reads_12345_S001_R1.fastq"} ],
         { "class":"File", "path":"reads_12346_S001_R2.fastq"} ]
       ],[
         { "class":"File", "path":"reads_12347_S002_R1.fastq"} ],
         { "class":"File", "path":"reads_12348_S002_R2.fastq"} ]
       ]
     ];
     */

    const fileItemGroups = this.get('fileItemGroups');
    return fileItemGroups.map(function (fileItemGroup) {
      return fileItemGroup.map(function(fileItem) {
        return fileItem.get('cwlObject');
      });
    });
  }),
  inputFiles: Ember.computed('fileItemGroups.[]', function() {
    // returns a flat array of the job input files
    const inputFiles = [];
    const fileItemGroups = this.get('fileItemGroups');

    fileItemGroups.forEach(function(fileItemGroup) {
      fileItemGroup.forEach(function(fileItem) {
        inputFiles.pushObject(fileItem.get('inputFile'));
      });
    });
    return inputFiles;
  }),
  ddsFiles: Ember.computed.mapBy('content', 'ddsFile')
});

export {
  FileItemList,
  FileItem
};
