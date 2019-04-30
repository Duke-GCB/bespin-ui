import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  workflowVersion: null,
  versionInfo: null,
  versionTag: Ember.computed('workflowVersion.workflow.tag', 'workflowVersion.version', function() {
    const tag = this.get('workflowVersion.workflow.tag');
    const version = this.get('workflowVersion.version');
    return `${tag}/${version}`;
  }),

  loadVersionInfo() {
    const component = this;
    const workflowVersion = this.get('workflowVersion');
    workflowVersion.getVersionInfo().then(versionInfo => {
      component.set('versionInfo', versionInfo);
    });
  },

  didInsertElement() {
    this._super(...arguments);
    this.loadVersionInfo();
  }

});
