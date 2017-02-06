import { moduleFor, test } from 'ember-qunit';

moduleFor('application', 'Integration | Serializer | job dds output directory answer', {
  integration: true
});

test('serializer handles the job-dds-output-directory-answer special cases', function(assert) {
  let store = this.container.lookup('service:store');

  function kfr(model, relationship) {
    return store.serializerFor(model).keyForRelationship(relationship);
  }

  assert.equal(kfr('job-dds-output-directory-answer', 'file'), 'file_id', 'Translates file to file_id on job-dds-output-directory-answer');
  assert.equal(kfr('job-dds-output-directory-answer', 'project'), 'project_id', 'Translates project to project_id on job-dds-output-directory-answer');
  assert.equal(kfr('job-dds-output-directory-answer', 'name'), 'name', 'Preserves other keys on job-dds-output-directory-answer');
  assert.equal(kfr('job-answer', 'file'), 'file', 'Does not translate file on other models');
});

