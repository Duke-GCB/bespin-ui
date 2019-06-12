import { moduleFor, test } from 'ember-qunit';
import Ember from "ember";

moduleFor('route:workflows/index', 'Unit | Route | workflows', {
  needs: ['service:session']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
