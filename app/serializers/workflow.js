import DRFSerializer from './drf';

export default DRFSerializer.extend({
  normalize(modelClass, resourceHash) {
    console.log(resourceHash['versions']);
    resourceHash['versions'] = resourceHash['versions'].map(v => v.split('/').reverse()[1]);
    return this._super(modelClass, resourceHash);
  }
});
