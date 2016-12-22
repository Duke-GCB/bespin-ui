import EmberRadioButton from 'ember-radio-buttons';

export default EmberRadioButton.extend({
  change: function() {
    this._super();
    this.onChange(this.get('value'));
  }
});
