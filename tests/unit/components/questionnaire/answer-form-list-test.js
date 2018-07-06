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
  assert.equal(this.$().text().trim(), '');
});

test('it computes fields property', function (assert) {
  let userFields = [
    {type: { type: 'array', items: { type: 'array', items: 'File' } }, name: 'fieldName1', label: 'label1'},
    {type: 'fieldType2', name: 'fieldName2', label: "label2" }
  ];
  let questionnaire = Ember.Object.create({ userFieldsJson: userFields});
  let answerSet = Ember.Object.create({questionnaire: questionnaire});
  let component = this.subject({answerSet: answerSet});
  let fields = component.get('fields');
  let expectedField = Ember.Object.create({
    name: 'fieldName1',
    label: 'label1',
    componentName: 'questionnaire/file-group-list',
    formatSettings: undefined,
  });
  assert.deepEqual(fields, [expectedField]);
});

test('it computes fields componentSettings', function (assert) {
  let userFields = [
    {type: { type: 'array', items: { type: 'array', items: 'File' } }, name: 'fieldName1', label: 'label1',
      format: 'http://edamontology.org/format_1915' },
    {type: 'fieldType2', name: 'fieldName2', label: 'label2' }
  ];
  let questionnaire = Ember.Object.create({ userFieldsJson: userFields});
  let answerSet = Ember.Object.create({questionnaire: questionnaire});
  let component = this.subject({answerSet: answerSet});
  let fields = component.get('fields');
  let expectedField = Ember.Object.create({
    name: 'fieldName1',
    label: 'label1',
    componentName: 'questionnaire/file-group-list',
    formatSettings: {
      title: 'File',
      format: 'http://edamontology.org/format_1915',
      groupName: 'File Group'
    },
  });
  assert.equal(JSON.stringify(fields), JSON.stringify([expectedField]));
});

test('it calculates componentNameForType', function (assert) {
  let fileArrayArrayType = { type: 'array', items: { type: 'array', items: 'File' } };
  let component = this.subject();
  let componentSettings = component.componentSettingsForCwlType(fileArrayArrayType);
  assert.equal(componentSettings.name, 'file-group-list');
});

test('it returns no component name for unknown types', function (assert) {
  let component = this.subject();
  let componentSettings = component.componentSettingsForCwlType({type: 'string'});
  assert.notOk(componentSettings);
});

test('it calculates formatSettingsForComponentAndFormat', function (assert) {
  let fileArrayArrayType = { type: 'array', items: { type: 'array', items: 'File' } };
  let component = this.subject();
  let componentSettings = component.componentSettingsForCwlType(fileArrayArrayType);
  let formatSettings = component.formatSettingsForComponentAndFormat(componentSettings,
    'http://edamontology.org/format_1915');
  assert.equal(formatSettings.title, 'File');
});

test('it handles answerChanged action', function (assert) {
  let answerSet = Ember.Object.create({userJobOrderJson: Ember.Object.create({prop1: 'val1'})});
  let component = this.subject({answerSet: answerSet});

  let mockAnswerComponent = Ember.Object.create({
    answer: Ember.Object.create({
      prop2: 'val2'
    }),
    inputFiles: [
      Ember.Object.create({stageGroup: null}),
    ]
  });

  component.send('answerChanged', mockAnswerComponent);
  assert.equal(component.get('answerSet.userJobOrderJson.prop1'), 'val1');
  assert.equal(component.get('answerSet.userJobOrderJson.prop2'), 'val2');
});

test('it sets stageGroup on answerChanged', function(assert) {
  const stageGroup = 'sg';
  const answerSet = Ember.Object.create({
    stageGroup: stageGroup,
    userJobOrderJson: Ember.Object.create({})
  });
  const component = this.subject({answerSet: answerSet});

  const inputFile1 = Ember.Object.create({});
  const inputFile2 = Ember.Object.create({});

  let mockAnswerComponent = Ember.Object.create({
    answer: Ember.Object.create({}),
    inputFiles: [
      inputFile1,
      inputFile2
    ],
    index: 2,
  });
  assert.notEqual(inputFile1.get('stageGroup'), stageGroup);
  assert.notEqual(inputFile2.get('stageGroup'), stageGroup);
  component.send('answerChanged', mockAnswerComponent);
  assert.equal(inputFile1.get('stageGroup'), stageGroup);
  assert.equal(inputFile2.get('stageGroup'), stageGroup);
  assert.equal(inputFile1.get('sequenceGroup'), 2);
  assert.equal(inputFile1.get('sequence'), 0);
  assert.equal(inputFile2.get('sequenceGroup'), 2);
  assert.equal(inputFile2.get('sequence'), 1);

});

test('it tolerates answerComponents without inputFiles', function(assert) {
  let answerSet = Ember.Object.create({userJobOrderJson: Ember.Object.create({prop1: 'val1'})});
  let component = this.subject({answerSet: answerSet});

  let mockAnswerComponent = Ember.Object.create({
    answer: Ember.Object.create({
      prop2: 'val2'
    }),
  });

  component.send('answerChanged', mockAnswerComponent);
  assert.equal(component.get('answerSet.userJobOrderJson.prop1'), 'val1');
  assert.equal(component.get('answerSet.userJobOrderJson.prop2'), 'val2');
});
