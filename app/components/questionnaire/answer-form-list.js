import Ember from 'ember';

/**
 * Map of CWL specified types to the Ember UI components that can provide their data
 * @type {[*]}
 */
const ComponentInfos = [
  {
    cwlType: { type: 'array', items: { type: 'array', items: 'File' } }, // From CWL
    name: 'file-group-list',  // Component to render
    description: 'A list of file pairs' // Description
  }
];

const AnswerFormList = Ember.Component.extend({
  answerSet: null,
  questionnaire: Ember.computed.alias('answerSet.questionnaire'),
  stageGroup: Ember.computed.alias('answerSet.stageGroup'),
  userJobOrder: Ember.computed.alias('answerSet.userJobOrder'),
  fields: Ember.computed('questionnaire.userFieldsArray.@each', function() {
    const userFieldsArray = this.get('questionnaire.userFieldsArray') || [];
    const fieldsToComponents = userFieldsArray.map(field => {
      let componentInfo = this.componentInfoForCwlType(field.type);
      if(Ember.isEmpty(componentInfo)) {
        return null;
      } else {
        return Ember.Object.create({
          name: field.name,
          componentName: `questionnaire/${componentInfo.name}`
        });
      }
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
  componentInfoForCwlType: function(cwlType) {
    return ComponentInfos.find(each => {
      // Ember does not have a comparison function for objects, so instead we'll compare their JSON representations
      // This should be fine for small types
      return JSON.stringify(each.cwlType) === JSON.stringify((cwlType));
    });
  },
  actions: {
    /*
     provideAnswer is passed down to the individual component.
     when user answers the question in the component, it is called
    * */
    provideAnswer(answer) {
      this.get('userJobOrder').setProperties(answer);
    },
    provideInputFiles(inputFiles) {
      let stageGroup = this.get('stageGroup');
      inputFiles.forEach(inputFile => {
        inputFile.set('stageGroup', stageGroup);
        inputFile.save();
      });
      // now the input files are linked to the stage group
    }
  }
});

AnswerFormList.reopenClass({
  positionalParams: ['answerSet']
});

export default AnswerFormList;
