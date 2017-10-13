import ApplicationSerializer from './application';
import DS from 'ember-data';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    outputProject: {embedded: 'always'},
    jobErrors: {embedded: 'always'}
  },

});
