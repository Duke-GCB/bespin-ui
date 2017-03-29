import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const bespinJobWatcherStub = Ember.Service.extend({
  startWatching() {},
  stopWatching() {}
});

moduleForComponent('job-detail', 'Integration | Component | job detail', {
  integration: true,
  beforeEach() {
    let job = Ember.Object.create({
      id: 1234,
      name: 'FooBar',
      created: '2016-12-31',
      lastUpdated: '2017-01-31',
      state: 'N',
      step: 'R',
      vmFlavor: 'm1.xlarge',
      vmInstanceName: 'job-1234',
      jobOrder: '{"foo":["bar"]}',
      outputDir: Ember.Object.create({
        project: {id: 'abv-123', name: 'project-name'},
        dirName: 'results-dir'
      }),
      jobErrors: [
        {content:"Error 1"},
        {content:"Error 2"},
      ]
    });
    this.set('job', job);
    this.set('jobErrors', []);
    this.register('service:bespin-job-watcher', bespinJobWatcherStub);
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{job-detail}}`);
  assert.equal(this.$('.job-detail').length, 1);
});

test('it renders job details', function(assert) {
  this.render(hbs`{{job-detail job}}`);
  let job = this.get('job');
  let assertText = (className, jobKey) => {
    assert.equal(this.$('.' + className).text(), job.get(jobKey), `job.${jobKey} rendered into .${className}`);
  };
  assertText('job-name', 'name');
  assertText('job-created', 'created');
  assertText('job-last-updated', 'lastUpdated');
  assert.equal(this.$('.job-state').text(), 'New');
  assert.equal(this.$('.job-step').text(), 'Running Workflow');
  assertText('job-vm-flavor', 'vmFlavor');
  assertText('job-vm-instance-name', 'vmInstanceName');
});

test('it pretty-prints JSON', function(assert) {
  let prettified_indent2 = '{\n  "foo": [\n    "bar"\n  ]\n}';
  this.render(hbs`{{job-detail job}}`);
  assert.equal(this.$('.job-order pre').text(), prettified_indent2);

  this.render(hbs`{{job-detail job indent=2}}`);
  assert.equal(this.$('.job-order pre').text(), prettified_indent2);

  let prettified_indent4 = '{\n    "foo": [\n        "bar"\n    ]\n}';
  this.render(hbs`{{job-detail job indent=4}}`);
  assert.equal(this.$('.job-order pre').text(), prettified_indent4);
});

test('it shows errors', function (assert) {
  this.render(hbs`{{job-detail job}}`);
  assert.equal(this.$('.job-error').length, 2);
  assert.equal(this.$('.job-error:eq(0)').text(), 'Error 1');
  assert.equal(this.$('.job-error:eq(1)').text(), 'Error 2');
});

test('it does not render results unless finished', function(assert) {
  this.render(hbs`{{job-detail job}}`);
  assert.equal(this.$('dd.job-results').length, 0);
  assert.equal(this.$('a.job-results-link').length, 0);
});

test('it renders results when finished', function(assert) {
  this.set('job.isFinished', true);
  this.render(hbs`{{job-detail job}}`);
  assert.equal(this.$('dd.job-results').length, 1);
  assert.equal(this.$('a.job-results-link').text(), 'project-name/results-dir');
});
