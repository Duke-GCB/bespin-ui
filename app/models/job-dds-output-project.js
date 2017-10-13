import DS from 'ember-data';

export default DS.Model.extend({
  dirName: DS.attr('string'),
  project: DS.belongsTo('dds-project'),
  job: DS.belongsTo('job'),
  ddsUserCredentials: DS.belongsTo('dds-user-credential'),
  readmeURL() {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.readmeURL(this.get('id'));
  }
});
