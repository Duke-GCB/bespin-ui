import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-output-directory-picker', 'Integration | Component | dds/dds output directory picker', {
  integration: true
});

test('it renders a form', function(assert) {
  this.render(hbs`{{dds/dds-output-directory-picker}}`);
  assert.equal(this.$('form').length, 1);
});

test('it registers changes to directoryName', function(assert) {
  // This component doesn't do much
  // projects, directoryName, onChange
  let oldName = 'ABC';
  let newName = 'XYZ';
  let onChange = function(project, directoryName) {
    assert.equal(directoryName, newName);
  };
  this.set('onChange', onChange);
  this.set('oldName', oldName);
  this.render(hbs`{{dds/dds-output-directory-picker [] oldName onChange}}`);
  this.$('input').val(newName);
  this.$('input').change(); // Required to trigger the update
  this.$('input').keypress(); // Triggers onChange
});
