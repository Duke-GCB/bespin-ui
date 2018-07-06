import Ember from 'ember';

export default Ember.Mixin.create({
  displayLabel: Ember.computed('fieldLabel', 'fieldName', function () {
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
