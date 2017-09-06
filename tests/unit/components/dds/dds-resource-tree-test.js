import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

const StoreStub = Ember.Service.extend({
  query() {
    return Ember.RSVP.resolve([
      Ember.Object.create({id: 1, name: 'C'}),
      Ember.Object.create({id: 2, name: 'D'}),
      Ember.Object.create({id: 3, name: 'B'}),
      Ember.Object.create({id: 4, name: 'A'}),
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
  let component = this.subject({resource: Ember.Object.create()});
  // Run in two separate Ember.run blocks, since side effect of fetchChildren must complete before we can check children
  Ember.run(() => {
    component.fetchChildren()
  });
  Ember.run(() => {
    assert.deepEqual(component.get('children').mapBy('name'), ['A', 'B', 'C', 'D']);
    assert.ok(component.get('fetchedOnce'));
  });
});

test('it filters files based on fileFilter', function(assert) {
  let component = this.subject({resource: Ember.Object.create()});
  component.set('fileFilter', (item) => {return item.get('name') == 'A'});
  Ember.run(() => {
    component.fetchChildren()
  });
  Ember.run(() => {
    assert.deepEqual(component.get('children').mapBy('name'), ['A']);
    assert.ok(component.get('fetchedOnce'));
  });

});
