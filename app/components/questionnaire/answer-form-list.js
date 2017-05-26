import Ember from 'ember';

const ComponentTypes = [
  {
    typeName: 'string',
    componentName: 'string',
    description: 'A string'
  },
  {
    typeName: { type: 'array', items: { type: 'array', items: 'File' } },
    componentName: 'file-pair-list',
    description: 'A list of file pairs'
  }
  ];


const AnswerFormList = Ember.Component.extend({
  questionnaire: null,
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
    Ember.Logger.log(`componentNameForType ${type}`);
    return ComponentTypes.find(each => {
      Ember.Logger.log(`comparing ${Ember.inspect(each.typeName)} to ${Ember.inspect(type)}`);
      if(Ember.compare(each.typeName, type) == 0) {
        Ember.Logger.log('match');
        return true;
      } else {
        Ember.Logger.log('no match');
        return false
      }
    });
  }
});

AnswerFormList.reopenClass({
  positionalParams: ['questionnaire']
});

export default AnswerFormList;
