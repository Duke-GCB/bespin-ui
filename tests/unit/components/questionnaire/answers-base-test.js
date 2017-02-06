import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('questionnaire/answers-base', 'Unit | Component | questionnaire/answers base', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it renders', function(assert) {

  // Creates the component instance
  /*let component =*/ this.subject();
  // Renders the component to the page
  this.render();
  assert.equal(this.$().text().trim(), '');
});

test('it computes system answers when readOnly', function(assert) {
  let sys = [1, 2, 3];
  let ReadOnlyQuestionProxy = Ember.Object.extend({
    systemAnswerValuePairs: sys,
    userAnswerValuePairs: [],
    readOnly: true
  });

  let answersBase = this.subject({questionProxy: ReadOnlyQuestionProxy.create()});
  assert.ok(answersBase.get('readOnly'));
  assert.equal(answersBase.get('answerValuePairs'), sys);
});

test('it computes user answers when not readOnly', function(assert) {
  let user = [77, 11];
  let ReadWriteQuestionProxy = Ember.Object.extend({
    systemAnswerValuePairs: [],
    userAnswerValuePairs: user,
    readOnly: false
  });

  let answersBase = this.subject({questionProxy: ReadWriteQuestionProxy.create()});
  assert.notOk(answersBase.get('readOnly'));
  assert.equal(answersBase.get('answerValuePairs'), user);
});
