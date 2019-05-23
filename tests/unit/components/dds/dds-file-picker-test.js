import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { resolve } from 'rsvp';
import Service from '@ember/service';
import { moduleForComponent, test } from 'ember-qunit';

const StoreStub = Service.extend({
  query() {
    return resolve([
      EmberObject.create({id: 1, name: 'C', isFile: true}),
      EmberObject.create({id: 2, name: 'B', isFile: true}),
      EmberObject.create({id: 3, name: 'D', isFile: true}),
      EmberObject.create({id: 4, name: 'A', isFile: true}),
    ]);
  }
});

moduleForComponent('dds/dds-file-picker', 'Unit | Component | dds/dds file picker', {
  unit: true,
  beforeEach() {
    this.register('service:store', StoreStub);
  }
});

test('it sorts files by name', function(assert) {
  let component = this.subject();
  // Run in two separate Ember.run blocks, since resources are fetched as a side effect of setting project
  run(() => {
    component.set('project', EmberObject.create({id:7}));
  });
  run(() => {
    assert.deepEqual(component.get('children').mapBy('name'), ['A', 'B', 'C', 'D']);
  });
});

test('it will filter based on formatSettings.fileNameRegexStr', function(assert) {
  let component = this.subject();
  component.set('formatSettings', EmberObject.create({fileNameRegexStr:'A|D'}));
  let pickedItems = [];
  component.set('onPick', (item) => {pickedItems.push(item.get('name'))});
  // Run in two separate Ember.run blocks, since resources are fetched as a side effect of setting project
  run(() => {
    component.set('project', EmberObject.create({id:7}));
  });
  component.pickAllFiles();
  assert.deepEqual(['A','D'], pickedItems);
});
