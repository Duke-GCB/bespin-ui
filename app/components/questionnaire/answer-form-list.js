import Ember from 'ember';

/**
 * Map of CWL specified types to the Ember UI components that can provide their data
 * @type {[*]}
 */
const ComponentTypes = [
  {
    typeName: { type: 'array', items: { type: 'array', items: 'File' } }, // From CWL
    componentName: 'file-group-list',  // Component to render
    description: 'A list of file pairs' // Description
  }
];

const AnswerFormList = Ember.Component.extend({
  answerSet: null,
  questionnaire: Ember.computed.alias('answerSet.questionnaire'),
  stageGroup: Ember.computed.alias('answerSet.stageGroup'),
  userJobOrder: Ember.Object.create({}),
  fields: Ember.computed('questionnaire.userFieldsArray.@each', function() {
    const userFieldsArray = this.get('questionnaire.userFieldsArray') || [];
    return userFieldsArray.map(field => {
      let componentInfo = this.componentNameForType(field.type);
      return Ember.Object.create({
        name: field.name,
        componentName: `questionnaire/${componentInfo.componentName}`
      });
    });
  }),
  componentNameForType: function(type) {
    return ComponentTypes.find(each => {
      if(Ember.compare(each.typeName, type) === 0) {
        return true;
      } else {
        return false;
      }
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
      });
      // now the input files are linked to the stage group
    },
    save() {
      /**
       * Simply wired to a button that prints out the current userJobOrder object built up by provide answer
       */
      let userJobOrderJSON = JSON.stringify(this.get('userJobOrder'));
      Ember.Logger.log(`User job order is ${userJobOrderJSON}`);
      // Need to save the answer set and the input files.
    }
  }
});

AnswerFormList.reopenClass({
  positionalParams: ['answerSet']
});

export default AnswerFormList;
