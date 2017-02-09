import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import StoreStub from '../../../helpers/store-stub';

moduleForComponent('questionnaire/file-answers', 'Unit | Component | questionnaire/file answers', {
  // Specify the other units that are required for this test
  needs: ['component:questionnaire.dds-file-answers', 'model:dds-project'],
  unit: true,
  beforeEach: function() {
    this.register('service:store', StoreStub);
    this.inject.service('store', {as: 'store'});
  }
});

test('it renders', function(assert) {
  // Creates the component instance
  /*let component =*/ this.subject();
  // Renders the component to the page
  this.render();
  assert.equal(this.$().text().trim(), '');
});

test('it computes model name when readOnly', function(assert) {
  let QuestionProxy = Ember.Object.extend({
    readOnly: true
  });

  let fileAnswers = this.subject({questionProxy: QuestionProxy.create()});
  assert.ok(fileAnswers.get('readOnly'));
  assert.equal(fileAnswers.get('modelName'), 'job-string-answer');
});

test('it computes model name when not readOnly', function(assert) {
  let QuestionProxy = Ember.Object.extend({
    readOnly: false
  });

  let fileAnswers = this.subject({questionProxy: QuestionProxy.create()});
  assert.notOk(fileAnswers.get('readOnly'));
  assert.equal(fileAnswers.get('modelName'), 'job-dds-file-answer');
});
