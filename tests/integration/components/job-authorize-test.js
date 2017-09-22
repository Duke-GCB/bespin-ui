import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('job-authorize', 'Integration | Component | job authorize', {
  integration: true
});

let MockJob = Ember.Object.extend({
  token: '',
  authorized: false,
  authorize: function () {
    this.set('authorized', true)
  }
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  const mockJob = MockJob.create({token:'secret-1'});
  this.set('job', mockJob);
  this.render(hbs`{{job-authorize job}}`);

  assert.equal(this.$().text().trim().replace(/\n/g,''), 'Authorization Code:            Authorize');
  assert.equal(mockJob.authorized, false);
  this.$('button').click();
  assert.equal(mockJob.authorized, true);

  // Template block usage:
  this.render(hbs`
    {{#job-authorize}}
    {{/job-authorize}}
  `);

  assert.equal(this.$().text().trim().replace(/\n/g,''), 'Authorization Code:            Authorize');
});
