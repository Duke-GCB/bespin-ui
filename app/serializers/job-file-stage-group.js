import ApplicationSerializer from './application';
import DS from 'ember-data';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    ddsFiles: {embedded: 'always'},
    urlFiles: {embedded: 'always'}
  },
});
