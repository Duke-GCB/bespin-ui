import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
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
  this.subject();
  this.render();
  assert.ok(this.$());
});

test('it computes answer with field name and files', function (assert) {
  const fieldName = 'mock_files';

  const mockFileItems = Ember.Object.create({
    cwlObjectValue: [2,3,1]
  });

  const fileGroupList = this.subject({groupSize: 2, fileItems: mockFileItems, fieldName: fieldName});
  const answer = fileGroupList.get('answer');

  const expected = Ember.Object.create({
    mock_files: [2,3,1]
  });
  assert.deepEqual(answer, expected);

});

test('it computes inputFiles array from the fileItems', function (assert) {
  const expected = ['foo', 'bar', 'baz'];
  const mockFileItems = Ember.Object.create({
    inputFiles: expected
  });
  const fileGroupList = this.subject({groupSize: 2, fileItems: mockFileItems, fieldName: 'field1'});
  const inputFiles = fileGroupList.get('inputFiles');
  assert.deepEqual(inputFiles, expected);
});

test('it handles removeAt action', function (assert) {
  assert.expect(2);
  const mockFileItems = Ember.Object.create({
    removeFileItem(groupIndex, fileIndex) {
      assert.equal(groupIndex, 3);
      assert.equal(fileIndex, 0);
    }
  });
  const fileGroupList = this.subject({groupSize:4, fileItems: mockFileItems});
  fileGroupList.send('removeAt', 3, 0);
});

test('it handles addFile action', function (assert) {
  assert.expect(4);
  const mockDdsFile = Ember.Object.create({
    createJobInputFile(prefix, credential) {
      assert.equal(prefix.indexOf('myField'), 0);
      assert.equal(credential, 'myCredential');
    },
    cwlFileObject(prefix) {
      assert.equal(prefix.indexOf('myField'), 0);
    }
  });

  const mockFileItems = Ember.Object.create({
    addFileItem(fileItem) {
      assert.ok(fileItem);
    }
  });
  const fileGroupList = this.subject({
    groupSize:4,
    fieldName: 'myField',
    fileItems: mockFileItems,
    ddsUserCredentials: Ember.Object.create({
      primaryCredential: 'myCredential'
    })
  });
  fileGroupList.send('addFile', mockDdsFile);
});
