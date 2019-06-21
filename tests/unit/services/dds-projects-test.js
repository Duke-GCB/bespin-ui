import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
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

module('Unit | Service | dds projects', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:store', ProjectsStoreStub);
    this.store = this.owner.lookup('service:store');
  });

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:dds-projects');
    assert.ok(service);
  });

  test('it fetches projects', function(assert) {
    let service = this.owner.lookup('service:dds-projects');
    service.projects().then(projects => {
      assert.equal(projects.length, 4);
    });
  });

  test('it sorts projects by name', function(assert) {
    let service = this.owner.lookup('service:dds-projects');
    service.projects().then(projects => {
      assert.deepEqual(projects.mapBy('name'), ['A','B','C','D']);
    });
  });
});
