// Object with filter method for filtering out file info
import Ember from 'ember';

const FilenameFilter = Ember.Object.extend({
  init() {
    this._super(...arguments);
    const fileNameRegexStr = this.get('fileNameRegexStr');
    const fileNameRegex = new RegExp(fileNameRegexStr);
    this.set('fileNameRegex', fileNameRegex);
  },

  filter(item) {
    const fileNameRegex = this.get('fileNameRegex');
    if (item.get('isFile')) {
      if (fileNameRegex.test(item.get('name'))) {
        return true;
      }
      return false;
    }
    return true;
  },

});


export default FilenameFilter;
