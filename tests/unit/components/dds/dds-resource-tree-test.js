import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { resolve } from 'rsvp';
import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

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

module('Unit | Component | dds/dds resource tree', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:store', StoreStub);
  });

  test('it sorts files by name', function(assert) {
    let component = this.owner.factoryFor('component:dds/dds-resource-tree').create({resource: EmberObject.create()});
    // Run in two separate Ember.run blocks, since side effect of fetchChildren must complete before we can check children
    run(() => {
      component.fetchChildren()
    });
    run(() => {
      assert.deepEqual(component.get('children').mapBy('name'), ['A', 'B', 'C', 'D']);
      assert.ok(component.get('fetchedOnce'));
    });
  });
});
