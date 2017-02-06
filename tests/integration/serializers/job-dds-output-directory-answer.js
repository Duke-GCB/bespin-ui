import { moduleFor, test } from 'ember-qunit';

moduleFor('application', 'Integration | Serializer | job dds file answer', {
  integration: true
});

test('serializer handles the job-dds-file-answer special cases', function(assert) {
  let store = this.container.lookup('service:store');

  function kfr(model, relationship) {
    return store.serializerFor(model).keyForRelationship(relationship);
  }

  assert.equal(kfr('job-dds-file-answer', 'file'), 'file_id', 'Translates file to file_id on job-dds-file-answer');
  assert.equal(kfr('job-dds-file-answer', 'project'), 'project_id', 'Translates project to project_id on job-dds-file-answer');
  assert.equal(kfr('job-dds-file-answer', 'name'), 'name', 'Preserves other keys on job-dds-file-answer');
  assert.equal(kfr('job-answer', 'file'), 'file', 'Does not translate file on other models');
});

