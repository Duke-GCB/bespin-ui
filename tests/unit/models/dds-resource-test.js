import { moduleForModel, test } from 'ember-qunit';
import { testRelationship } from '../../helpers/test-relationships';
import Ember from 'ember';

moduleForModel('dds-resource', 'Unit | Model | dds resource', {
  needs: ['model:dds-project', 'model:dds-job-input-file', 'model:dds-user-credential']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it computes file kind', function(assert) {
  let model = this.subject();
  Ember.run(() => {model.set('kind', 'dds-file');});
  assert.ok(model.get('isFile'));
  assert.notOk(model.get('isFolder'));
});

test('it computes folder kind', function(assert){
  let model = this.subject();
  Ember.run(() => {model.set('kind', 'dds-folder');});
  assert.ok(model.get('isFolder'));
  assert.notOk(model.get('isFile'));
});

testRelationship('dds-resource', {key: 'project', kind: 'belongsTo', type: 'dds-project'});

test('it generates prefixed file names', function(assert) {
  let model = this.subject();
  Ember.run(() => {
    model.set('name', 'myfile.txt');
    let prefixed = model.getNameWithPrefix('prefix');
    assert.equal(prefixed, 'prefix_myfile.txt');
  });
});

test('it generates a CWL File object', function(assert) {
  const ddsFile = this.subject({name: 'myfile.txt'});
  const prefix = 'prefix';
  const cwlFile = ddsFile.cwlFileObject(prefix);
  assert.ok(cwlFile);
  const expected = {
    class: 'File',
    path : 'prefix_myfile.txt'
  };
  assert.deepEqual(cwlFile, expected);
});

test('It works with map', function (assert) {
  Ember.run(() => {
    const files = [
      this.store().createRecord('dds-resource', {name: 'file1.txt'}),
      this.store().createRecord('dds-resource', {name: 'file2.txt'}),
      this.store().createRecord('dds-resource', {name: 'file3.txt'})
    ];
    const wrapped = files.map((file, index) => {
      return file.cwlFileObject(index);
    });
    const expected = [
      {
        class: 'File',
        path : '0_file1.txt'
      },
      {
        class: 'File',
        path : '1_file2.txt'
      },
      {
        class: 'File',
        path : '2_file3.txt'
      }
    ];
    assert.deepEqual(wrapped, expected);
  });
});

test('It creates job input files with DDS IDs', function (assert) {
  Ember.run(() => {
    const projectId = 'project-abc';
    const fileId = 'file-def';
    const project = this.store().createRecord('dds-project', { id: projectId });
    const cred =  this.store().createRecord('dds-user-credential', { id: 7 });
    const ddsFile = this.store().createRecord('dds-resource', {
      name: 'file1.txt',
      project: project,
      id: fileId,
    });
    const prefix = 'input1';
    const inputFile = ddsFile.createJobInputFile(prefix, cred);

    assert.equal(inputFile.get('destinationPath'), 'input1_file1.txt');
    assert.equal(inputFile.get('projectId'), projectId);
    assert.equal(inputFile.get('fileId'), fileId);
    assert.equal(inputFile.get('ddsUserCredentials.id'), cred.get('id'));
  });
});
