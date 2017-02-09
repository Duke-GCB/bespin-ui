import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

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
      jobOrder: '{"foo":["bar"]}'
    });
    this.set('job', job);
    this.set('jobErrors', []);
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
  this.set('jobErrors', [
    {content: 'Error 1'},
    {content: 'Error 2'}
  ]);
  this.render(hbs`{{job-detail job jobErrors}}`);
  assert.equal(this.$('.job-error').length, 2);
  assert.equal(this.$('.job-error:eq(0)').text(), 'Error 1');
  assert.equal(this.$('.job-error:eq(1)').text(), 'Error 2');
});
