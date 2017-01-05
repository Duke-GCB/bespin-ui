import { moduleFor, test } from 'ember-qunit';

moduleFor('service:new-job-wizard', 'Unit | Service | new job wizard', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  beforeEach() {
    this.subject().set('router', { transitionTo() {} });
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('it switches routes on next step', function(assert) {
  let service = this.subject();
  service.next();
  assert.equal('jobs.new.select-workflow', service.get('currentRoute'));
});

test('it switches routes on prev step', function(assert) {
  let service = this.subject();
  service.set('step', 1);
  assert.equal('jobs.new.select-input-files', service.get('currentRoute'));
  service.prev();
  assert.equal('jobs.new.select-workflow', service.get('currentRoute'));
});
