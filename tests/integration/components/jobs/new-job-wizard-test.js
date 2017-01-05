import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const wizardStub = Ember.Service.extend({
  next() {},
});

moduleForComponent('jobs/new-job-wizard', 'Integration | Component | jobs/new job wizard', {
  integration: true,
  beforeEach: function() {
    this.register('service:new-job-wizard', wizardStub);
    this.inject.service('new-job-wizard', { as: 'wizard'});
  }
});

test('it renders', function(assert) {
  this.set('job', {});
  this.set('workflows',[]);
  this.render(hbs`{{jobs/new-job-wizard job workflows}}`);
  assert.equal(this.$().text().trim(), 'Step:');
});
