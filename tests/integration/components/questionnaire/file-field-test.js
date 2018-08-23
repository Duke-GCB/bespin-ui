import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import StoreStub from "../../../helpers/store-stub";
import Ember from "ember";

moduleForComponent('questionnaire/file-field', 'Integration | Component | questionnaire/file field', {
  integration: true,
  beforeEach: function() {
    this.register('service:store', StoreStub);
  }
});

test('it renders with no fileItem', function(assert) {
  Ember.run(() => {
    this.set('fileItem', null);
    this.set('externalAction', () => {});
    this.render(hbs`{{questionnaire/file-field "SomeField" externalAction fileItem=fileItem}}`);
    assert.equal(this.$('label').html(), 'SomeField from Duke Data Service');
    assert.equal(this.$('.file-field-selection label').text().trim(), 'Selected file');
    assert.equal(this.$('.file-field-selection div').text().trim(), 'None');
  });
});

test('it renders with a fileItem', function(assert) {
  Ember.run(() => {
    this.set('fileItem', {name: 'foo.txt'});
    this.set('externalAction', () => {});
    this.render(hbs`{{questionnaire/file-field "SomeField" externalAction fileItem=fileItem}}`);
    assert.equal(this.$('label').html(), 'SomeField from Duke Data Service');
    assert.equal(this.$('.file-field-selection label').text().trim(), 'Selected file');
    assert.equal(this.$('.file-field-selection div').text().trim(), 'foo.txt');
  });
});

test('it renders with fieldLabel instead of fieldName when provided', function(assert) {
  Ember.run(() => {
    this.set('fileItem', null);
    this.set('externalAction', () => {});
    this.render(hbs`{{questionnaire/file-field "SomeField" externalAction fileItem=fileItem fieldLabel="Some Label"}}`);
    assert.equal(this.$('label').html(), 'Some Label from Duke Data Service');
    assert.equal(this.$('.file-field-selection label').text().trim(), 'Selected file');
    assert.equal(this.$('.file-field-selection div').text().trim(), 'None');
  });
});

test('it shows/hides errors based on answerFormErrors.show', function(assert) {
  this.set('fieldName', 'field-name');
  this.set('externalAction', () => {});
  this.set('answerFormErrors', Ember.Object.create({
    show: true,
    errors: [{field: 'field-name', message: 'Error Message'}],
    setError() { }
  }));
  this.render(hbs`{{questionnaire/file-field fieldName=fieldName answerChanged=externalAction
                                             answerFormErrors=answerFormErrors}}`);
  assert.equal(this.$('.error-panel').text().trim(), 'Error Message');

  this.set('answerFormErrors.show', false);
  this.render(hbs`{{questionnaire/file-field fieldName=fieldName answerChanged=externalAction
                                             answerFormErrors=answerFormErrors}}`);
  assert.equal(this.$('.error-panel').text().trim(), '');
});

test('it correctly observes error array', function(assert) {
  const errors = Ember.Object.create({
    show: true,
    errors: [{field: 'field-name', message: 'Empty'}],
    setError() { }
  });
  this.set('answerFormErrors', errors);
  this.set('fieldName', 'field-name');
  this.set('externalAction', () => {});
  Ember.run(() => {
    // Initially empty
    this.render(hbs`{{questionnaire/file-field fieldName=fieldName answerChanged=externalAction
                                               answerFormErrors=answerFormErrors}}`);
    assert.equal(this.$('.error-panel').text().trim(), 'Empty');

    // Now replace the errors and verify the new error is displayed
    this.set('answerFormErrors.errors', [{field: 'field-name', message: 'Incomplete'}]);
    assert.equal(this.$('.error-panel').text().trim(), 'Incomplete');
  });
});
