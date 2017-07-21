import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

const StoreStub = Ember.Service.extend({
  query() {
    return Ember.RSVP.resolve([
      Ember.Object.create({id: 1, name: 'C'}),
      Ember.Object.create({id: 2, name: 'B'}),
      Ember.Object.create({id: 3, name: 'D'}),
      Ember.Object.create({id: 4, name: 'A'}),
    ]);
  }
});

moduleForComponent('dds/dds-file-picker', 'Unit | Component | dds/dds file picker', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true,
  beforeEach() {
    // inject the service
    this.register('service:store', StoreStub);
  }
});

test('it sorts files by name', function(assert) {
  let component = this.subject();
  // Run in two separate Ember.run blocks, since resources are fetched as a side effect of setting project
  Ember.run(() => {
    component.set('project', Ember.Object.create({id:7}));
  });
  Ember.run(() => {
    assert.deepEqual(component.get('resources').mapBy('name'), ['A', 'B', 'C', 'D']);
  });
});
