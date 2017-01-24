import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('questionnaire/dds-file-answer', 'Integration | Component | questionnaire/dds file answer', {
  integration: true,
  beforeEach: function() {
    this.set('store', Ember.Object.create({
      callCount: 0,
      findAll() {
        // For projects!
        this.set('callCount', this.get('callCount') + 1);
        return new Ember.RSVP.Promise(function (resolve) {
          resolve([{id:'abc-123'}]);
        });
      },

    }));
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{questionnaire/dds-file-answer store=store}}`);
  assert.ok(true);
});

test('it calls onCancel when cancel button clicked', function(assert) {
  this.set('onAnswer', function() { assert.notOk(true); });
  this.set('onCancel', function() { assert.ok(true); });
  this.render(hbs`{{questionnaire/dds-file-answer 0 onAnswer onCancel store=store}}`);
  this.$('.back-button').click(); // Now calls onCancel
});

test('it calls onAnswer when next button clicked', function(assert) {
  this.set('onAnswer', function() { assert.ok(true); });
  this.set('onCancel', function() { assert.notOk(true); });
  this.render(hbs`{{questionnaire/dds-file-answer 0 onAnswer onCancel store=store answers=[]}}`);
  this.$('.next-button').click(); // Now calls onCancel
});

test('it enables next button when isValid', function(assert) {
  this.set('occurs', 3); // Require 3 things
  this.set('pickedFiles', []); // Pick none
  this.render(hbs`{{questionnaire/dds-file-answer occurs onAnswer onCancel pickedFiles=pickedFiles store=store}}`);
  assert.equal(this.$('.next-button[disabled]').length, 1, 'next button should be disabled');

  this.set('occurs', 3); // Require 3 things
  this.set('pickedFiles', [1,2,3]); // Pick 3
  this.render(hbs`{{questionnaire/dds-file-answer occurs onAnswer onCancel pickedFiles=pickedFiles store=store}}`);
  assert.equal(this.$('.next-button[disabled]').length, 0, 'next button should not be disabled');
});
