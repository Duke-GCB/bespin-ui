import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('questionnaire/question-list', 'Integration | Component | questionnaire/question list', {
  integration: true
});

test('it renders', function(assert) {
  let questionProxies = [
    Ember.Object.create({id:1}),
    Ember.Object.create({id:2})
  ];
  let questionProxySet = Ember.Object.create({questionProxies: questionProxies});
  this.set('questionProxySet', questionProxySet);

  this.render(hbs`{{questionnaire/question-list questionProxySet}}`);
  assert.equal(this.$('.question-list').length, 1, 'should render 1 question list');
  assert.equal(this.$('li').length, 2);
});
