import EmberObject, { computed } from '@ember/object';
import Component from '@ember/component';
import ComponentSettings from 'bespin-ui/utils/component-settings';

const AnswerFormList = Component.extend({
  classNames: ['answer-form-list'],
  answerSet: null,
  answerFormErrors: null, // Client-side validation errors, passed down to each component
  fields: computed('answerSet.questionnaire.userFieldsJson.@each', function() {
    const userFields = this.get('answerSet.questionnaire.userFieldsJson') || [];
    const fieldsToComponents = userFields.map(field => {
      let componentSettings = this.componentSettingsForCwlType(field.type);
      let formatSettings = this.formatSettingsForComponentAndFormat(componentSettings, field.format);
      return EmberObject.create({
        name: field.name,
        label: field.label,
        componentName: `questionnaire/${componentSettings.name}`,
        formatSettings: formatSettings,
      });
    });
    // Strip out any fields for which we don't have a component
    return fieldsToComponents.compact();
  }),
  /**
   * Look up the component name to use to render a form field for the given CWL type
   * May return null
   * @param type
   * @returns {*}
   */
  componentSettingsForCwlType: function(cwlType) {
    const settings = ComponentSettings.find(each => {
      // Ember does not have a comparison function for objects, so instead we'll compare their JSON representations
      // This should be fine for small types
      return JSON.stringify(each.cwlType) === JSON.stringify((cwlType));
    });
    if(!settings) {
      return {
        cwlType: cwlType,
        name: 'unknown-field',  // questionnaire component to render
        formats: [], // No file formats for an unknown field
      };
    }
    return settings;
  },

  /**
   * Given settings for a componennt and a format string lookup settings for that format.
   * May return null
   * @param componentSettings
   * @param format
   * @returns {*}
     */
  formatSettingsForComponentAndFormat: function(componentSettings, format) {
    return componentSettings.formats.find(each => {
      return each.format == format;
    });
  },

  actions: {
    answerChanged(answerComponent) {
      // Answer components will send this action when their answer changes
      // When that happens, update the answer and any input files
      const answerSet = this.get('answerSet');
      let userJobOrder = EmberObject.create(answerSet.get('userJobOrderJson'));
      userJobOrder.setProperties(answerComponent.get('answer'));
      answerSet.set('userJobOrderJson', userJobOrder);
      // If the component has any inputFiles, set their stage group
      const inputFiles = answerComponent.get('inputFiles');
      if(inputFiles) {
        const stageGroup = answerSet.get('stageGroup');
        const sequenceGroup = answerComponent.get('index');
        inputFiles.forEach((inputFile, index) => {
          inputFile.setProperties({
            stageGroup: stageGroup,
            sequenceGroup: sequenceGroup,
            sequence: index,
          })
        })
      }
    }
  }
});

AnswerFormList.reopenClass({
  positionalParams: ['answerSet', 'answerFormErrors']
});

export default AnswerFormList;
