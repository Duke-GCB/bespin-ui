import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

//Stub location service
const ddsUrlFetcherStub = Service.extend({
  fetchReadmeUrl(outputProject) {
    return {
      then(onData, onFail) {
        if (outputProject.stubHint == 'loaddata') {
          onData("MarkdownData")
        }
        if (outputProject.stubHint == 'showerror') {
          onFail({
            errors: [{
              status: 404,
              detail: "Not Found"
            }]
          })
        }
      }
    };
  }
});

module('Integration | Component | job output readme', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:dds-url-fetcher', ddsUrlFetcherStub);
    this.ddsUrlFetcher = this.owner.lookup('service:dds-url-fetcher');
  });

  test('it renders loading', async function(assert) {
    this.set('outputProject', {
      stubHint: 'neverload'
    });

    await render(hbs`{{job-output-readme outputProject=outputProject}}`);
    assert.equal(this.$().text().trim(), 'Loading...');

    // Template block usage:
    await render(hbs`
      {{#job-output-readme outputProject=outputProject}}
        template block text
      {{/job-output-readme}}
    `);
    assert.equal(this.$().text().trim().replace(/ +/, ''), 'Loading...\ntemplate block text');
  });

  test('it renders content for readme', async function(assert) {
    this.set('outputProject', {
      stubHint: 'loaddata'
    });
    await render(hbs`{{job-output-readme outputProject=outputProject}}`);
    assert.equal(this.$().text().trim(), 'MarkdownData');
  });

  test('it renders error on failure for readme', async function(assert) {
    this.set('outputProject', {
      stubHint: 'showerror'
    });
    await render(hbs`{{job-output-readme outputProject=outputProject}}`);
    assert.equal(this.$('.error-details').text().trim(), 'Not Found');
  });
});
