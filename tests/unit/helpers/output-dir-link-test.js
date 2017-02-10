
import { outputDirLink } from 'bespin-ui/helpers/output-dir-link';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Helper | output dir link');

// Replace this with your real tests.
test('it generates dataservice project url from output dir object', function(assert) {
  let outputDir = Ember.Object.create({
    id: 5,
    dir_name: "dir",
    project_id: 'dc269c4e-28df-487c-9cb9-37ad95db1fdb',
    job: 70,
    dds_user_credentials: 17
  });
  let result = outputDirLink([outputDir]);
  assert.equal(result, 'https://dataservice.duke.edu/#/project/dc269c4e-28df-487c-9cb9-37ad95db1fdb');
});

test('it handles missing project url', function(assert) {
  let outputDir = Ember.Object.create();
  let result = outputDirLink([outputDir]);
  assert.equal(result, '');
});

test('it handles empty arguments', function(assert) {
  let result = outputDirLink();
  assert.equal(result,'');
} );


