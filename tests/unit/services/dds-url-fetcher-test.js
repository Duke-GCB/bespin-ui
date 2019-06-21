import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | dds url fetcher', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    const service = this.owner.lookup('service:dds-url-fetcher');
    assert.ok(service);
  });

  test('it fetches a readme url for an output project', function(assert) {
    assert.expect(2);
    const readmeData = "# SomeData";
    const urlInfo = {
      'dds-file-url': {
        'host': 'http://somehost',
        'url': '/someurl'
      }
    };
    const service = this.owner.factoryFor('service:dds-url-fetcher').create({
      fetchUrl(url) {
        assert.equal('http://somehost/someurl', url);
        return resolve(readmeData);
      }
    });
    const outputProject = {
      readmeURL: function() {
        return resolve(urlInfo);
      }
    };
    const response = service.fetchReadmeUrl(outputProject);
    response.then(function(data) {
      assert.equal('# SomeData', data);
    });
  });
});

