import Ember from 'ember';
import DisplayFieldLabelMixin from 'bespin-ui/mixins/display-field-label-mixin';

const UnknownField = Ember.Component.extend(DisplayFieldLabelMixin, {
  fieldName: null
});

UnknownField.reopenClass({
  positionalParams: ['fieldName']
});

export default UnknownField;
