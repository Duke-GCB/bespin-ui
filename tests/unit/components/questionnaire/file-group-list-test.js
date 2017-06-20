import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('questionnaire/file-group-list', 'Unit | Component | questionnaire/file group list', {
  // Specify the other units that are required for this test
  needs: ['component:dds.dds-project-files-picker', 'component:bs-button'],
  unit: true
});

test('it renders', function(assert) {

  // Creates the component instance
  /*let component =*/ this.subject();
  // Renders the component to the page
  this.render();
  assert.ok(this.$());
});

test('it groups files groups by groupSize', function (assert) {
  const files = [1,2,3,4,5,6];
  const fileGroupList = this.subject({groupSize:3, files: files});
  const groups = fileGroupList.get('groups');
  assert.equal(groups.length, 2);
  assert.deepEqual(groups, [[1,2,3],[4,5,6]]);
});

test('it groups files by groupSize even when not full', function (assert) {
  const files = [1,2,3,4,5,6];
  const fileGroupList = this.subject({groupSize:4, files: files});
  const groups = fileGroupList.get('groups');
  assert.equal(groups.length, 2);
  assert.deepEqual(groups, [[1,2,3,4],[5,6]]);
});


test('it computes answer with field name and files', function (assert) {
  const fieldName = 'mock_files';
  const MockFile = Ember.Object.extend({
    cwlFileObject(prefix) { return prefix; }
  });
  const files = [MockFile.create(), MockFile.create(), MockFile.create()];
  const expected = Ember.Object.create({
    mock_files: [
      ['mock_files_0_0','mock_files_0_1'],
      ['mock_files_1_0']
    ]});
  const fileGroupList = this.subject({groupSize:2, files: files, fieldName: fieldName});
  const answer = fileGroupList.get('answer');
  assert.deepEqual(answer, expected);

});

test('it computes inputFiles array from groups, matching names of files', function (assert) {
  const fieldName = 'mock_files';
  const MockFile = Ember.Object.extend({
    createJobInputFile(prefix, credential) { return `${prefix}_${credential}`; }
  });
  const files = [MockFile.create(), MockFile.create(), MockFile.create()];
  const expected = [
    'mock_files_0_0_c1',
    'mock_files_0_1_c1',
    'mock_files_1_0_c1'
  ];
  const fileGroupList = this.subject({
    groupSize:2,
    files: files,
    fieldName: fieldName,
    ddsUserCredentials: {
      primaryCredential: 'c1'
    }
  });
  const inputFiles = fileGroupList.get('inputFiles');
  assert.deepEqual(inputFiles, expected);
});

test('it handles removeAt action', function (assert) {
  const files = [1,2,3,4,5,6];
  const fileGroupList = this.subject({groupSize:4, files: files});
  // [1,2,3,4], [5,6]
  fileGroupList.send('removeAt', 0, 3);
  // [1,2,3,5], [6]
  const expected = [[1,2,3,5], [6]];
  assert.deepEqual(fileGroupList.get('groups'), expected);
});

test('it handles addFile action', function (assert) {
  const files = [1,2,3,4];
  const fileGroupList = this.subject({groupSize:4, files: files});
  fileGroupList.send('addFile', 5);
  fileGroupList.send('addFile', 6);
  const expected = [[1,2,3,4], [5,6]];
  assert.deepEqual(fileGroupList.get('groups'), expected);
});
