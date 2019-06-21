import { resolve } from 'rsvp';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:dds-url-fetcher', 'Unit | Service | dds url fetcher', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  const service = this.subject();
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
  const service = this.subject({
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

