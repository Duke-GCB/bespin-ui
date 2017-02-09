import Ember from 'ember';
import AnswersBase from './answers-base';

export default AnswersBase.extend({
  modelName: Ember.computed('readOnly', function() {
    const readOnly = this.get('readOnly');
    if (readOnly) {
      return 'job-string-answer';
    } else {
      return 'job-dds-output-directory-answer';
    }
  })
});
