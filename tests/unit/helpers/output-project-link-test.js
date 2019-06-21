
import EmberObject from '@ember/object';
import { outputProjectLink } from 'bespin-ui/helpers/output-project-link';
import { module, test } from 'qunit';

module('Unit | Helper | output project link', function() {
  // Replace this with your real tests.
  test('it generates dataservice project url from output project object', function(assert) {
    let outputProject = EmberObject.create({
      id: 5,
      project: {
        id: 'dc269c4e-28df-487c-9cb9-37ad95db1fdb'
      },
      job: 70,
      dds_user_credentials: 17
    });
    let result = outputProjectLink([outputProject]);
    assert.equal(result, 'https://dataservice.duke.edu/#/project/dc269c4e-28df-487c-9cb9-37ad95db1fdb');
  });

  test('it handles missing project url', function(assert) {
    let outputProject = EmberObject.create();
    let result = outputProjectLink([outputProject]);
    assert.equal(result, '');
  });

  test('it handles empty arguments', function(assert) {
    let result = outputProjectLink();
    assert.equal(result,'');
  } );
});


