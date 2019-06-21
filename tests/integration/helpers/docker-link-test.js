import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:docker-link', function(hooks) {
  setupRenderingTest(hooks);

  test('it generates a link from a docker image name with version', async function(assert) {
    this.set('dockerImage', 'org/repo:version');
    await render(hbs`{{docker-link dockerImage}}`);
    assert.equal(this.$().text().trim(), 'https://hub.docker.com/r/org/repo');
  });

  test('it generates link for image names without versions', async function(assert) {
    this.set('dockerImage', 'org/repo');
    await render(hbs`{{docker-link dockerImage}}`);
    assert.equal(this.$().text().trim(), 'https://hub.docker.com/r/org/repo');
  });

  test('it handles empty strings', async function(assert) {
    this.set('dockerImage', '');
    await render(hbs`{{docker-link dockerImage}}`);
    assert.equal(this.$().text().trim(), '');
  });

  test('it handles strings without separators gracefully', async function(assert) {
    this.set('dockerImage', 'something:else');
    await render(hbs`{{docker-link dockerImage}}`);
    assert.equal(this.$().text().trim(), '');
  });

  test('it handles images with docker.io host', async function(assert) {
    this.set('dockerImage', 'docker.io/org/repo');
    await render(hbs`{{docker-link dockerImage}}`);
    assert.equal(this.$().text().trim(), 'https://hub.docker.com/r/org/repo');
  });

  test('it handles images with quay.io host', async function(assert) {
    this.set('dockerImage', 'quay.io/dukegcb/htseq');
    await render(hbs`{{docker-link dockerImage}}`);
    assert.equal(this.$().text().trim(), 'https://quay.io/repository/dukegcb/htseq');
  });
});
