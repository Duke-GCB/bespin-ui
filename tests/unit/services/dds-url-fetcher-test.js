import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:dds-url-fetcher', 'Unit | Service | dds url fetcher', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  const service = this.subject();
  assert.ok(service);
});

test('it fetches a readme url for a output dir', function(assert) {
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
      return Ember.RSVP.resolve(readmeData);
    }
  });
  const outputDir = {
    readmeURL: function() {
      return Ember.RSVP.resolve(urlInfo);
    }
  };
  const response = service.fetchReadmeUrl(outputDir);
  response.then(function(data) {
    assert.equal('# SomeData', data);
  });
});

