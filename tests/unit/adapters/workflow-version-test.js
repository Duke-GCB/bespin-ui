import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | workflow version', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:workflow-version');
    assert.ok(adapter);
  });

  test('it GETs version-info for getVersionInfo', function(assert) {
    assert.expect(4);
    let adapter = this.owner.lookup('adapter:workflow-version');
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
});
