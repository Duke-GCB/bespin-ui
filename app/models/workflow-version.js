import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  workflow: DS.belongsTo('workflow'),
  description: DS.attr('string'),
  objectName: DS.attr('string'),
  created: DS.attr('date'),
  url: DS.attr('string'),
  version: DS.attr('string'),
  jobs: DS.hasMany('job'),
  questionnaires: DS.hasMany('job-questionnaire'),
  methodsDocument: DS.belongsTo('workflow-methods-document'),
  versionInfoUrl: DS.attr('string'),
  enableUi: DS.attr('boolean'),
  disableUi: Ember.computed.not('enableUi'),
  getVersionInfo() {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.getVersionInfo(this.get('id'));
  }
});
