import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('error-panel', 'Integration | Component | error panel', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('noErrors', [])
  this.set('oneError', [{
    'attribute': 'jobName',
    'message': 'required',
  }]);

  this.render(hbs`{{error-panel errors=noErrors}}`);
  assert.equal(this.$().text().trim(), '');

  this.render(hbs`{{error-panel errors=oneError}}`);
  assert.equal(this.$('li').text(), 'required');


  this.render(hbs`
    {{#error-panel errors=oneError}}
      <span class='childtext'>template block text</span>
    {{/error-panel}}
  `);

  assert.equal(this.$('.childtext').text().trim(), 'template block text');
});
