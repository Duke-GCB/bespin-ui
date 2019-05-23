import { computed } from '@ember/object';
import { not } from '@ember/object/computed';
import DS from 'ember-data';

export default DS.Model.extend({
  workflow: DS.belongsTo('workflow'),
  description: DS.attr('string'),
  workflowPath: DS.attr('string'),
  created: DS.attr('date'),
  url: DS.attr('string'),
  version: DS.attr('string'),
  jobs: DS.hasMany('job'),
  questionnaires: DS.hasMany('job-questionnaire'),
  methodsDocument: DS.belongsTo('workflow-methods-document'),
  toolDetails: DS.belongsTo('workflow-version-tool-detail'),
  versionInfoUrl: DS.attr('string'),
  enableUi: DS.attr('boolean'),
  disableUi: not('enableUi'),
  getVersionInfo() {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.getVersionInfo(this.get('id'));
  },
  versionTag: computed('workflow.tag', 'version', function() {
    const tag = this.get('workflow.tag');
    const version = this.get('version');
    return `${tag}/${version}`;
  }),

});
