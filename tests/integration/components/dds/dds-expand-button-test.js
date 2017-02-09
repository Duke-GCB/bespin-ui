import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-expand-button', 'Integration | Component | dds/dds expand button', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{dds/dds-expand-button}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dds/dds-expand-button}}
      template block text
    {{/dds/dds-expand-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it is not expanded by default', function(assert) {
  this.render(hbs`{{dds/dds-expand-button}}`);
  assert.equal(this.$('span.glyphicon-folder-open').length, 0);
});

test('it binds class name to expanded state', function(assert) {
  assert.expect(4);
  this.render(hbs`{{dds/dds-expand-button true}}`);
  assert.equal(this.$('span.glyphicon-folder-open').length, 1);
  assert.equal(this.$('span.glyphicon-folder-close').length, 0);
  this.render(hbs`{{dds/dds-expand-button false}}`);
  assert.equal(this.$('span.glyphicon-folder-open').length, 0);
  assert.equal(this.$('span.glyphicon-folder-close').length, 1);
});

test('it sends action on click', function(assert) {
  this.on('clicked', function() {
    assert.ok(true);
  });
  this.render(hbs`{{dds/dds-expand-button action="clicked"}}`);
  this.$('span.dds-expand-button').click();
});
