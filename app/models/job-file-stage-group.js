import DS from 'ember-data';

export default DS.Model.extend({
  ddsFiles: DS.hasMany('dds-job-input-file'),
  urlFiles: DS.hasMany('url-job-input-file')
});
