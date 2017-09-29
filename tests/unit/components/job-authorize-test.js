import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('job-authorize', 'Unit | Component | job authorize', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it reads token from job when job has authorization', function(assert) {
  const mockJob = Ember.Object.create({hasAuthorization: true, runToken: 'jobRunToken'});
  let jobAuthorize = this.subject({job:mockJob});
  assert.equal(jobAuthorize.get('token'), 'jobRunToken');
});

test('it reads token from local variable when job does not have authorization', function(assert) {
  const mockJob = Ember.Object.create({hasAuthorization: false, runToken: 'jobRunToken'});
  let jobAuthorize = this.subject({job: mockJob});
  assert.equal(jobAuthorize.get('token'), '');
  jobAuthorize.set('token', 'localToken');
  assert.equal(jobAuthorize.get('token'), 'localToken');
});

test('setting the token on authorized jobs does not change it', function(assert) {
  const mockJob = Ember.Object.create({hasAuthorization: true, runToken: 'jobRunToken'});
  let jobAuthorize = this.subject({job: mockJob});
  assert.equal(jobAuthorize.get('token'), 'jobRunToken');
  jobAuthorize.set('token', 'testToken');
  assert.equal(jobAuthorize.get('token'), 'jobRunToken');
  assert.equal(mockJob.get('runToken'), 'jobRunToken');
});

test('errors from job.authorize are set on the component', function(assert) {
  const mockError = Ember.Object.create({
    status: 400,
    detail: 'This token is not valid.'
  });
  const mockJob = Ember.Object.create({
    authorize(token) {
      assert.equal(token, 'auth-token');
      return Ember.RSVP.reject({errors: [mockError]});
    }
  });
  let jobAuthorize = this.subject({job: mockJob});
  Ember.run(() => {
    jobAuthorize.set('token', 'auth-token');
    jobAuthorize.send('authorize');
  });
  Ember.run(() => {
    assert.deepEqual(jobAuthorize.get('errors'), [mockError]);
  });
});
