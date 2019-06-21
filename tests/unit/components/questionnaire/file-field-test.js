import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | questionnaire/file field', function(hooks) {
  setupTest(hooks);

  test('it requires fieldName and answerChanged', function(assert) {
    assert.throws(() => {
      this.owner.factoryFor('component:questionnaire/file-field').create({});
    });
    assert.throws(() => {
      this.owner.factoryFor('component:questionnaire/file-field').create({fieldName: "SomeField"});
    });
    assert.throws(() => {
      this.owner.factoryFor('component:questionnaire/file-field').create({answerChanged: ()=>{}});
    });
    this.owner.factoryFor('component:questionnaire/file-field').create({fieldName: "SomeField", answerChanged: ()=>{}});
  });
});
