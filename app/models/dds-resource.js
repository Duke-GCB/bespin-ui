import DS from 'ember-data';

let DDSKinds = {file:'dds-file', folder: 'dds-folder'};

export default DS.Model.extend({
  kind: DS.attr('string'),
  name: DS.attr('string'),
  isFile: Ember.computed('kind', function() { return this.get('kind') === DDSKinds.file}),
  isFolder: Ember.computed('kind', function() { return this.get('kind') === DDSKinds.folder})
});
