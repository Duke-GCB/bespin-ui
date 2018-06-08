import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import StoreStub from "../../../helpers/store-stub";

moduleForComponent('questionnaire/dds-project-field', 'Integration | Component | questionnaire/dds project field', {
  integration: true,
  beforeEach: function() {
    this.register('service:store', StoreStub);
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{questionnaire/dds-project-field}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#questionnaire/dds-project-field}}
      template block text
    {{/questionnaire/dds-project-field}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
