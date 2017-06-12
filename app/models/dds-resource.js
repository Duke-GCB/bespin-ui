import DS from 'ember-data';
import Ember from 'ember';
const DDSKinds = {file:'dds-file', folder: 'dds-folder'};

export default DS.Model.extend({
  kind: DS.attr('string'),
  name: DS.attr('string'),
  isFile: Ember.computed('kind', function () {
    return this.get('kind') === DDSKinds.file;
  }),
  isFolder: Ember.computed('kind', function () {
    return this.get('kind') === DDSKinds.folder;
  }),
  project: DS.belongsTo('dds-project'),
  size: DS.attr('number'),
  version: DS.attr('number'),
  version_id: DS.attr('string'),

  getNameWithPrefix(prefix) {
    return `${prefix}_${this.get('name')}`;
  },

  cwlFileObject(prefix) {
    return {
      'class': 'File',
      'path': this.getNameWithPrefix(prefix)
    };
  },

  createJobInputFile(prefix, credential) {
    // Creates a DDSJobInputFile from a DDSResource
    return this.get('store').createRecord('dds-job-input-file', {
      projectId: this.get('project.id'),
      fileId: this.get('id'),
      destinationPath: this.getNameWithPrefix(prefix),
      ddsUserCredentials: credential
    });
  }
});
