import { run } from '@ember/runloop';
import { reject } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | job authorize', function(hooks) {
  setupTest(hooks);

  test('it reads token from job when job has authorization', function(assert) {
    const mockJob = EmberObject.create({hasAuthorization: true, runToken: 'jobRunToken'});
    let jobAuthorize = this.owner.factoryFor('component:job-authorize').create({job:mockJob});
    assert.equal(jobAuthorize.get('token'), 'jobRunToken');
  });

  test('it reads token from local variable when job does not have authorization', function(assert) {
    const mockJob = EmberObject.create({hasAuthorization: false, runToken: 'jobRunToken'});
    let jobAuthorize = this.owner.factoryFor('component:job-authorize').create({job: mockJob});
    assert.equal(jobAuthorize.get('token'), '');
    jobAuthorize.set('token', 'localToken');
    assert.equal(jobAuthorize.get('token'), 'localToken');
  });

  test('setting the token on authorized jobs does not change it', function(assert) {
    const mockJob = EmberObject.create({hasAuthorization: true, runToken: 'jobRunToken'});
    let jobAuthorize = this.owner.factoryFor('component:job-authorize').create({job: mockJob});
    assert.equal(jobAuthorize.get('token'), 'jobRunToken');
    jobAuthorize.set('token', 'testToken');
    assert.equal(jobAuthorize.get('token'), 'jobRunToken');
    assert.equal(mockJob.get('runToken'), 'jobRunToken');
  });

  test('errors from job.authorize are set on the component', function(assert) {
    const mockError = EmberObject.create({
      status: 400,
      detail: 'This token is not valid.'
    });
    const mockJob = EmberObject.create({
      authorize(token) {
        assert.equal(token, 'auth-token');
        return reject({errors: [mockError]});
      }
    });
    let jobAuthorize = this.owner.factoryFor('component:job-authorize').create({job: mockJob});
    run(() => {
      jobAuthorize.set('token', 'auth-token');
      jobAuthorize.send('authorize');
    });
    run(() => {
      assert.deepEqual(jobAuthorize.get('errors'), [mockError]);
    });
  });
});
