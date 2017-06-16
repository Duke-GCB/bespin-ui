import Ember from 'ember';

const FileGroupList = Ember.Component.extend({
  /**
   * Encapsulates a file picker and a grouping/pairing control
   */
  groupSize: 2,
  fieldName: null,
  provideAnswer: (/* cwl object */) => {}, // call with a CWL object
  provideInputFiles: (/* files[] */) => {}, // call with an array of DDSJobInputFiles
  ddsProjects: Ember.inject.service(),
  ddsUserCredentials: Ember.inject.service(),
  projects: Ember.computed.alias('ddsProjects.projects'),
  selectedResources: Ember.computed.alias('files.[]'),
  files: null,
  groups: Ember.computed('files.[]', 'groupSize', function() {
    let files = this.get('files');
    let fileCount = files.get('length');
    let groupSize = this.get('groupSize');
    let groups = [];
    for(let i = 0;i < fileCount;i = i + groupSize) {
      const group = [];
      for(let j = i; j < i + groupSize && j < fileCount; j++){
        group.pushObject(files.objectAt(j));
      }
      groups.pushObject(group);
    }
    return groups;
  }),
  answer: Ember.computed('fieldName', 'groups.[]', function() {
    /*
     Example: creates CWL File[][] structure from the following read data:

     fieldName: reads
     Pair 1: S001_R1.fastq, S001_R2.fastq
     Pair 2: S002_R1.fastq, S002_R2.fastq

     Produces:

     [
      [
       { "class":"File", "path":"reads_0_0_S001_R1.fastq"} ],
       { "class":"File", "path":"reads_0_1_S001_R2.fastq"} ]
      ],[
       { "class":"File", "path":"reads_1_0_S002_R1.fastq"} ],
       { "class":"File", "path":"reads_1_1_S002_R2.fastq"} ]
      ]
     ];
     */

    const fieldName = this.get('fieldName');
    const groups = this.get('groups');

    const fieldValue = groups.map(function (group, groupIndex) {
      return group.map(function(file, fileIndex) {
        const filePrefix = `${fieldName}_${groupIndex}_${fileIndex}`;
        return file.cwlFileObject(filePrefix);
      });
    });

    const answer = Ember.Object.create();
    answer.set(fieldName, fieldValue);
    return answer;
  }),
  inputFiles: Ember.computed('fieldName', 'groups.[]', 'ddsUserCredentials.primaryCredential', function() {
    // Create a flat array of DDSJobInputFiles, MUST PROVIDE SAME NAMING ORDER
    const credential = this.get('ddsUserCredentials.primaryCredential');
    const files = [];
    const fieldName = this.get('fieldName');
    const groups = this.get('groups');

    groups.forEach(function(group, groupIndex) {
      group.forEach(function(file, fileIndex) {
        const filePrefix = `${fieldName}_${groupIndex}_${fileIndex}`;
        const inputFile = file.createJobInputFile(filePrefix, credential);
        files.pushObject(inputFile);
      });
    });
    return files;
  }),

  actions: {
    addFile(file) {
      this.get('files').pushObject(file);
    },
    provide() {
      // provide must make two calls:
      // 1. Call provideFiles with an array of DDSJobInputFiles
      // 2. Call provideAnswer a CWL object representing these files
      // The destinationPath in the DDSJobInputFile must match the path in the CWL Object
      this.get('provideAnswer')(this.get('answer'));
      this.get('provideInputFiles')(this.get('inputFiles'));
    },
    removeAt(groupIndex, fileIndex) {
      let index = this.get('groupSize') * groupIndex + fileIndex;
      this.get('files').removeAt(index);
    }
  },
  init(){
    this._super(...arguments);
    if(Ember.isEmpty(this.get('files'))) {
      this.set('files', []);
    }
  }
});

FileGroupList.reopenClass({
  positionalParams: ['fieldName','provideAnswer','provideInputFiles']
});

export default FileGroupList;
