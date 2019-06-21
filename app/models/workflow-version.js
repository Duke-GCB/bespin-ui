import { computed } from '@ember/object';
import { not } from '@ember/object/computed';
import DS from 'ember-data';
import { padStart } from 'ember-pad/utils/pad';

const VERSION_SORT_LPAD_AMT = 10;

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
  versionSort: computed('version', function () {
    const version = this.get('version');
    if (version) {
      // Splits semantic versioning string and left pad parts.
      // Follows bespin-api's WorkflowVersion.sort_workflow_then_version_key method.
      const parts = version.split(/\.|-/);
      return parts.map(x => padStart(x, VERSION_SORT_LPAD_AMT));
    }
    return null;
  })
});
