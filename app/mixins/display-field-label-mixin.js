import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';
export default Mixin.create({
  displayLabel: computed('fieldLabel', 'fieldName', function () {
    const fieldLabel = this.get('fieldLabel');
    if (fieldLabel) {
      return fieldLabel
    } else {
      const fieldName = this.get('fieldName');
      return fieldName
        .replace(/_/g, ' ') // underscores to spaces
        .split(/ +/) // split on spaces
        .map(x => x.capitalize()) // capitalize all words
        .join(' '); // put string together
    }
  }),
});
