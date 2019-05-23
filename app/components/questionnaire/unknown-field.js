import Component from '@ember/component';
import DisplayFieldLabelMixin from 'bespin-ui/mixins/display-field-label-mixin';

const UnknownField = Component.extend(DisplayFieldLabelMixin, {
  fieldName: null
});

UnknownField.reopenClass({
  positionalParams: ['fieldName']
});

export default UnknownField;
