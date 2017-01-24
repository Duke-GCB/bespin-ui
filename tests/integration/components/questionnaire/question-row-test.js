import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('questionnaire/question-row', 'Integration | Component | questionnaire/question row', {
  integration: true,
  beforeEach: function() {
    this.set('store', Ember.Object.create({
      callCount: 0,
      createRecord(kind, props) {
        this.set('callCount', this.get('callCount') + 1);
        return new Ember.RSVP.Promise(function (resolve) {
          resolve(Ember.Object.create(props));
        });
      },
    }));
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{questionnaire/question-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#questionnaire/question-row}}
      template block text
    {{/questionnaire/question-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
