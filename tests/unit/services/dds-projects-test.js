import EmberObject from '@ember/object';
import { moduleFor, test } from 'ember-qunit';
import StoreStub from '../../helpers/store-stub';

const ProjectsStoreStub = StoreStub.extend({
  findAllFunction() {
    return [
      EmberObject.create({id: 1, name: 'C'}),
      EmberObject.create({id: 2, name: 'A'}),
      EmberObject.create({id: 3, name: 'D'}),
      EmberObject.create({id: 4, name: 'B'})
    ];
  }
});

moduleFor('service:dds-projects', 'Unit | Service | dds projects', {
  // Specify the other units that are required for this test.
  needs: ['model:dds-project'],
  beforeEach() {
    this.register('service:store', ProjectsStoreStub);
    this.inject.service('store', {as: 'store'});
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('it fetches projects', function(assert) {
  let service = this.subject();
  service.projects().then(projects => {
    assert.equal(projects.length, 4);
  });
});

test('it sorts projects by name', function(assert) {
  let service = this.subject();
  service.projects().then(projects => {
    assert.deepEqual(projects.mapBy('name'), ['A','B','C','D']);
  });
});
