import { on } from '@ember/object/evented';
import EmberObject, { computed, observer } from '@ember/object';
import { FileItem } from 'bespin-ui/utils/file-item-list';
import DDSProjectField from './dds-project-field';
import DisplayFieldLabelMixin from 'bespin-ui/mixins/display-field-label-mixin';
import { assert } from '@ember/debug';

const FileField = DDSProjectField.extend(DisplayFieldLabelMixin, {
  /**
   * Lets user pick a file and see any errors associated with the field.
   */
  tagName: 'div',
  classNames: ['file-field', 'row'],
  answerFormErrors: null,
  fieldErrors: computed('answerFormErrors.errors.[]', 'fieldName', function() {
    return this.get('answerFormErrors.errors').filterBy('field', this.get('fieldName'));
  }),
  validityDidChange: on('init', observer('fileItem', function() {
      const answerFormErrors = this.get('answerFormErrors');
      const fieldName = this.get('fieldName');
      if(!answerFormErrors) {
        // We have not answerFormErrors object, bail out
        return;
      }
      if(!this.get('fileItem')) {
        answerFormErrors.setError(fieldName, `Please select a file.`)
      } else {
        // All Good!
        answerFormErrors.clearError(fieldName);
      }
    })),
  formatSettings: null,  // settings based on cwl type and format
  fieldName: null,
  fieldLabel: null,
  answer: computed('fieldName', 'fileItem.cwlObject', function() {
    const fieldName = this.get('fieldName');
    const answer = EmberObject.create();
    answer.set(fieldName, this.get('fileItem.cwlObject'));
    return answer;
  }),
  fileItem: null,
  inputFiles: computed('fileItem.inputFile', function() {
    // returns a flat array of the job input files
    return [this.get('fileItem.inputFile')];
  }),
  ddsFiles: computed('fileItem.ddsFile', function () {
      return [this.get('fileItem.ddsFile')];
  }),
  actions: {
    remove() {
      this.set('fileItem', null);
      this.sendAction('answerChanged', this);
    },
    setFile(file) {
      const credential = this.get('credential');
      // Temporarily removing prefix to preserve original file names.
      // See https://github.com/Duke-GCB/bespin-ui/issues/39
      const prefix = ''; // `${this.get('fieldName')}_${Date.now()}_`;
      const fileItem = FileItem.create({ddsFile: file, prefix: prefix, credential: credential});
      this.set('fileItem', fileItem);
      this.sendAction('answerChanged', this);
    }
  },
  didReceiveAttrs() {
    this._super(...arguments);
    assert('Answerable component requires fieldName property', this.get('fieldName'));
    assert('Answerable component requires answerChanged function property', typeof this.get('answerChanged') == 'function');
  },
});

FileField.reopenClass({
  positionalParams: ['fieldName','answerChanged']
});

export default FileField;

