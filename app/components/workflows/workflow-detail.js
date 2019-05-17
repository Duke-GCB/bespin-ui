import Ember from 'ember';
import { makeSortKey } from 'bespin-ui/utils/version-sort';

const WorkflowDetail = Ember.Component.extend({
  classNames: ['workflow-detail'],
  workflow: null,
  sortedVersionsNewestFirst: Ember.computed('workflow.versions[]', function() {
    const versions = this.get('workflow.versions');
    const annotated = versions.map(version => { return { key: makeSortKey(Ember.getWithDefault(version, 'version', '')), version: version}; });
    return annotated.sortBy('key').mapBy('version').reverse();
  })
});

WorkflowDetail.reopenClass({
  positionalParams: ['workflow']
});

export default WorkflowDetail;
