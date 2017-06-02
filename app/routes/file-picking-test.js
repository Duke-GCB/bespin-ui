import Ember from 'ember';
import FilePairArray from 'bespin-ui/utils/file-pair-array';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').query('dds-resource', {
       folder_id: params.folder_id
    }).then(function(resources) {
      let filePairArray = FilePairArray.create();
      resources.forEach(resource => {
        Ember.Logger.log(`Adding ${Ember.inspect(resource)}`);
        filePairArray.addFile(resource);
      });
      return filePairArray;
    });
  }
});
