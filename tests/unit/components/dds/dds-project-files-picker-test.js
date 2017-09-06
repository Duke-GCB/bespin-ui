import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('dds/dds-project-files-picker', 'Unit | Component | dds/dds project files picker', {
  // Specify the other units that are required for this test
  needs: ['component:bs-form', 'component:bs-form/group', 'component:dds/dds-project-picker',
          'component:dds/dds-file-picker'],
  unit: true
});

test('it filtersFiles allows all files when no fileNameRegexStr specified', function(assert) {
  // Creates the component instance
  let component = this.subject();
  let file1 = Ember.Object.create({name:'data.txt', isFile:true});
  let file2 = Ember.Object.create({name:'file1.tar.gz', isFile:true});
  let file3 = Ember.Object.create({name:'results.tar', isFile:true});
  assert.equal(component.get('fileFilter')(file1), true);
  assert.equal(component.get('fileFilter')(file2), true);
  assert.equal(component.get('fileFilter')(file3), true);
});

test('it filtersFiles filters files when fileNameRegexStr specified', function(assert) {
  // Creates the component instance
  let component = this.subject(
    {
      fileNameRegexStr:'.*tar.gz$'
    }
  );
  let file1 = Ember.Object.create({name:'data.txt', isFile:true});
  let file2 = Ember.Object.create({name:'file1.tar.gz', isFile:true});
  let file3 = Ember.Object.create({name:'results.tar', isFile:true});
  assert.equal(component.get('fileFilter')(file1), false);
  assert.equal(component.get('fileFilter')(file2), true);
  assert.equal(component.get('fileFilter')(file3), false);
});
