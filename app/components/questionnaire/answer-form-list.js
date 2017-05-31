import Ember from 'ember';

/**
 * Map of CWL specified types to the Ember UI components that can provide their data
 * @type {[*]}
 */
const ComponentTypes = [
  {
    typeName: { type: 'array', items: { type: 'array', items: 'File' } }, // From CWL
    componentName: 'file-pair-list',  // Component to render
    description: 'A list of file pairs' // Description
  }
  ];

const AnswerFormList = Ember.Component.extend({
  questionnaire: null,
  userJobOrder: Ember.Object.create({}),
  fields: Ember.computed('questionnaire.userFieldsArray.@each', function() {
    return this.get('questionnaire.userFieldsArray').map(field => {
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
    provideAnswer(fieldName, value) {
      this.get('userJobOrder').set(fieldName, value);
    },
    save() {
      /**
       * Simply wired to a button that prints out the current userJobOrder object built up by provide answer
       */
      let userJobOrderJSON = JSON.stringify(this.get('userJobOrder'));
      Ember.Logger.log(`User job order is ${userJobOrderJSON}`);
    }
  }
});

AnswerFormList.reopenClass({
  positionalParams: ['questionnaire']
});

export default AnswerFormList;
