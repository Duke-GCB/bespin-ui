import { alias } from '@ember/object/computed';
import DS from 'ember-data';

export default DS.Model.extend({
  workflowVersion: DS.belongsTo('workflow-version'),
  // content is a reserved name so we create `contents` for use in templates
  content: DS.attr('string'),
  contents: alias('content'),
});
