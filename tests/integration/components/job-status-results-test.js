import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-status-results', 'Integration | Component | job status results', {
  integration: true
});

test('it renders', function(assert) {
  let job = EmberObject.create({
    outputProject: EmberObject.create({
      project: {id: 'abv-123', name: 'project-name'},
      dirName: 'results-dir'
    })
  });
  this.set('job', job);
  this.render(hbs`{{job-status-results job}}`);
  assert.equal(this.$('span.job-status-results').length, 1);
  assert.equal(this.$('a.job-results-link').text(), 'project-name/results-dir');
  assert.ok(this.$('a').attr('href'));
});
