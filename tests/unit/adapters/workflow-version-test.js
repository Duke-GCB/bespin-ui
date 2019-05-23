import { resolve } from 'rsvp';
import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:workflow-version', 'Unit | Adapter | workflow version', {
  // Specify the other units that are required for this test.
  needs: ['service:session']
});

test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it GETs version-info for getVersionInfo', function(assert) {
  assert.expect(4);
  let adapter = this.subject();
  adapter.set('ajax', (url, method) => {
    assert.equal(url, '/workflow-versions/123/version-info/');
    assert.equal(method, 'GET');
    return resolve({
      'workflow-version-info-contents': {
        'workflow_version': '123',
        'url': 'http://example.com/info.md',
        'content': '# hello',
        'content_type': 'text/plain'
      }
    });
  });
  const response = adapter.getVersionInfo(123);
  response.then(resp => {
    assert.equal(resp.content, '# hello');
    assert.equal(resp.content_type, 'text/plain');
  });
});
