import Ember from 'ember';
import JobWatcherMixin from 'bespin-ui/mixins/job-watcher';
import { module, test } from 'qunit';

module('Unit | Mixin | job watcher');

// Replace this with your real tests.
test('it works', function(assert) {
  let JobWatcherObject = Ember.Object.extend(JobWatcherMixin);
  let subject = JobWatcherObject.create();
  assert.ok(subject);
});
