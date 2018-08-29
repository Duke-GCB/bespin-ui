import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('questionnaire/file-field', 'Unit | Component | questionnaire/file field', {
  // Specify the other units that are required for this test
  needs: ['service:dds-projects', 'service:dds-user-credentials'],
  unit: true
});

test('it requires fieldName and answerChanged', function(assert) {
  assert.throws(() => {
    this.subject({});
  });
  assert.throws(() => {
    this.subject({fieldName: "SomeField"});
  });
  assert.throws(() => {
    this.subject({answerChanged: ()=>{}});
  });
  this.subject({fieldName: "SomeField", answerChanged: ()=>{}});
});
