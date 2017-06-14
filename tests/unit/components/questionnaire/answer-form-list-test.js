import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('questionnaire/answer-form-list', 'Unit | Component | questionnaire/answer form list', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  needs: ['component:bs-button'],
  unit: true
});

test('it renders', function(assert) {

  // Creates the component instance
  /*let component =*/ this.subject();
  // Renders the component to the page
  this.render();
  assert.equal(this.$().text().trim(), 'Save');
});

test('it computes fields property', function (assert) {
  let userFieldsArray = [
    {type: { type: 'array', items: { type: 'array', items: 'File' } }, name: 'fieldName1' },
    {type: 'fieldType2', name: 'fieldName2' }
  ];
  let questionnaire = Ember.Object.create({ userFieldsArray: userFieldsArray});
  let answerSet = Ember.Object.create({questionnaire: questionnaire});
  let component = this.subject({answerSet: answerSet});
  let fields = component.get('fields');
  let expectedField = Ember.Object.create({name: 'fieldName1', componentName: 'questionnaire/file-group-list'});
  assert.deepEqual(fields, [expectedField]);
});

test('it calculates componentNameForType', function (assert) {
  let fileArrayArrayType = { type: 'array', items: { type: 'array', items: 'File' } };
  let component = this.subject();
  let fieldComponent = component.componentInfoForCwlType(fileArrayArrayType);
  assert.equal(fieldComponent.name, 'file-group-list');
});

test('it returns no component name for unknown types', function (assert) {
  let component = this.subject();
  let fieldComponent = component.componentInfoForCwlType({type: 'string'});
  assert.notOk(fieldComponent);
});

test('it handles provideAnswer action', function (assert) {
  let answerSet = Ember.Object.create({userJobOrder: Ember.Object.create({prop1: 'val1'})});
  let component = this.subject({answerSet: answerSet});
  component.send('provideAnswer', Ember.Object.create({prop2: 'val2'}));
  assert.equal(component.get('answerSet.userJobOrder.prop1'), 'val1');
  assert.equal(component.get('answerSet.userJobOrder.prop2'), 'val2');
});

test('it sets the answerSets stageGroup on inputFiles when calling provideInputFiles action', function (assert) {
  let stageGroup = Ember.Object.create({id:'stage-group-1'});
  let answerSet = Ember.Object.create({stageGroup: stageGroup});
  let inputFiles = [
    Ember.Object.create({stageGroup:null, name: 'file1'}),
    Ember.Object.create({stageGroup:null, name: 'file2'}),
  ];
  let component = this.subject({answerSet: answerSet});
  component.send('provideInputFiles', inputFiles);
  assert.equal(inputFiles[0].get('stageGroup'), stageGroup);
  assert.equal(inputFiles[1].get('stageGroup'), stageGroup);
});
