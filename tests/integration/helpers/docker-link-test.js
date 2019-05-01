import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('docker-link', 'helper:docker-link', {
  integration: true
});

test('it generates a link from a docker image name with version', function(assert) {
  this.set('dockerImage', 'org/repo:version');
  this.render(hbs`{{docker-link dockerImage}}`);
  assert.equal(this.$().text().trim(), 'https://hub.docker.com/r/org/repo');
});

test('it generates link for image names without versions', function(assert) {
  this.set('dockerImage', 'org/repo');
  this.render(hbs`{{docker-link dockerImage}}`);
  assert.equal(this.$().text().trim(), 'https://hub.docker.com/r/org/repo');
});

test('it handles empty strings', function(assert) {
  this.set('dockerImage', '');
  this.render(hbs`{{docker-link dockerImage}}`);
  assert.equal(this.$().text().trim(), '');
});

test('it handles strings without separators gracefully', function (assert) {
  this.set('dockerImage', 'something:else');
  this.render(hbs`{{docker-link dockerImage}}`);
  assert.equal(this.$().text().trim(), '');
});

test('it handles images with docker.io host', function (assert) {
  this.set('dockerImage', 'docker.io/org/repo');
  this.render(hbs`{{docker-link dockerImage}}`);
  assert.equal(this.$().text().trim(), 'https://hub.docker.com/r/org/repo');
});

test('it handles images with quay.io host', function(assert) {
  this.set('dockerImage', 'quay.io/dukegcb/htseq');
  this.render(hbs`{{docker-link dockerImage}}`);
  assert.equal(this.$().text().trim(), 'https://quay.io/repository/dukegcb/htseq');
});
