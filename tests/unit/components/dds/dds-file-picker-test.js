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
  unit: true,
  beforeEach() {
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
    assert.deepEqual(component.get('children').mapBy('name'), ['A', 'B', 'C', 'D']);
  });
});

test('it filters files based on fileFilter', function(assert) {
  let component = this.subject();
  component.set('fileFilter', (item) => {return item.get('name') == 'A'});
  Ember.run(() => {
    component.set('project', Ember.Object.create({id:7}));
  });
  Ember.run(() => {
    assert.deepEqual(component.get('children').mapBy('name'), ['A']);
  });

});
