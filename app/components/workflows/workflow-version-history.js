import Ember from 'ember';

const WorkflowVersionHistory = Ember.Component.extend({
  classNames: ['workflow-version-history'],
  workflowVersion: null,
  versionInfoContent: null,
  loadVersionInfo() {
    const component = this;
    const workflowVersion = this.get('workflowVersion');
    workflowVersion.getVersionInfo().then(versionInfo => {
      component.set('versionInfoContent', atob(versionInfo.content));
    });
  },

  didInsertElement() {
    this._super(...arguments);
    this.loadVersionInfo();
  }
});

WorkflowVersionHistory.reopenClass({
  positionalParams: ['workflowVersion']
});

export default WorkflowVersionHistory;
