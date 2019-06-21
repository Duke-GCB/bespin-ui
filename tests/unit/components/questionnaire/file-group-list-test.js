import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import StoreStub from '../../../helpers/store-stub';

moduleForComponent('questionnaire/file-group-list', 'Unit | Component | questionnaire/file group list', {
  // Specify the other units that are required for this test
  needs: ['component:dds.dds-project-files-picker',
    'component:bs-button',
    'service:dds-projects',
    'service:dds-user-credentials'
  ],
  unit: true,
  beforeEach() {
    // inject the service
    this.register('service:store', StoreStub);
  }
});

test('it renders', function(assert) {
  this.subject({
    fieldName: "SomeField",
    answerChanged: ()=>{}
  });
  this.render();
  assert.ok(this.$());
});

test('it computes answer with field name and files', function (assert) {
  const fieldName = 'mock_files';
  const mockFileItems = EmberObject.create({
    cwlObjectValue: [2,3,1]
  });

  const fileGroupList = this.subject({
    groupSize: 2,
    fileItems: mockFileItems,
    fieldName: fieldName,
    answerChanged: ()=>{}
  });
  const answer = fileGroupList.get('answer');

  const expected = EmberObject.create({
    mock_files: [2,3,1]
  });
  assert.deepEqual(answer, expected);

});

test('it computes inputFiles array from the fileItems', function (assert) {
  const expected = ['foo', 'bar', 'baz'];
  const mockFileItems = EmberObject.create({
    inputFiles: expected
  });
  const fileGroupList = this.subject({
    groupSize: 2,
    fileItems: mockFileItems,
    fieldName: 'field1',
    answerChanged: ()=>{}
  });
  const inputFiles = fileGroupList.get('inputFiles');
  assert.deepEqual(inputFiles, expected);
});

test('it handles removeAt action', function (assert) {
  assert.expect(2);
  const mockFileItems = EmberObject.create({
    removeFileItem(groupIndex, fileIndex) {
      assert.equal(groupIndex, 3);
      assert.equal(fileIndex, 0);
    }
  });
  const fileGroupList = this.subject({
    groupSize:4,
    fileItems: mockFileItems,
    fieldName: 'field1',
    answerChanged: ()=>{}
  });
  fileGroupList.send('removeAt', 3, 0);
});

test('it handles addFile action', function (assert) {
  assert.expect(4);
  const mockDdsFile = EmberObject.create({
    createJobInputFile(prefix, credential) {
      // Temporarily removing prefix to preserve original file names.
      // See https://github.com/Duke-GCB/bespin-ui/issues/39
      // assert.equal(prefix.indexOf('myField'), 0);
      assert.equal(prefix,'');
      assert.equal(credential, 'myCredential');
    },
    cwlFileObject(prefix) {
      // Temporarily removing prefix to preserve original file names.
      // See https://github.com/Duke-GCB/bespin-ui/issues/39
      // assert.equal(prefix.indexOf('myField'), 0);
      assert.equal(prefix, '');
    }
  });

  const mockFileItems = EmberObject.create({
    addFileItem(fileItem) {
      assert.ok(fileItem);
    }
  });
  const fileGroupList = this.subject({
    groupSize:4,
    fieldName: 'myField',
    answerChanged: ()=>{},
    fileItems: mockFileItems,
    credential: 'myCredential'
  });
  fileGroupList.send('addFile', mockDdsFile);
});

test('it generates groupTitle based on formatSettings.groupName', function (assert) {
  let fileGroupList = this.subject({
    formatSettings: {
      groupName: 'Subject'
    },
    fieldName: 'myField',
    answerChanged: ()=>{},
  });
  assert.equal('Subject', fileGroupList.get('groupTitle'));
});

test('it generates groupTitle without formatSettings.groupName', function (assert) {
  let fileGroupList = this.subject({
    fieldName: 'myField',
    answerChanged: ()=>{}
  });
  assert.equal('file', fileGroupList.get('groupTitle'));
});

test('it requires fieldName and answerChanged', function(assert) {
  assert.throws(() => {
    this.subject({});
  });
  assert.throws(() => {
    this.subject({fieldName: "SomeField"});
  });
  assert.throws(() => {
    this.subject({answerChanged: ()=>{}});
  });
  this.subject({fieldName: "SomeField", answerChanged: ()=>{}});
});
