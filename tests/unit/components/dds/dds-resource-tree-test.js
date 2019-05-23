import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { resolve } from 'rsvp';
import Service from '@ember/service';
import { moduleForComponent, test } from 'ember-qunit';

const StoreStub = Service.extend({
  query() {
    return resolve([
      EmberObject.create({id: 1, name: 'C'}),
      EmberObject.create({id: 2, name: 'D'}),
      EmberObject.create({id: 3, name: 'B'}),
      EmberObject.create({id: 4, name: 'A'}),
    ]);
  }
});

moduleForComponent('dds/dds-resource-tree', 'Unit | Component | dds/dds resource tree', {
  unit: true,
  beforeEach() {
    this.register('service:store', StoreStub);
  }
});

test('it sorts files by name', function(assert) {
  let component = this.subject({resource: EmberObject.create()});
  // Run in two separate Ember.run blocks, since side effect of fetchChildren must complete before we can check children
  run(() => {
    component.fetchChildren()
  });
  run(() => {
    assert.deepEqual(component.get('children').mapBy('name'), ['A', 'B', 'C', 'D']);
    assert.ok(component.get('fetchedOnce'));
  });
});
