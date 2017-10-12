import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

//Stub location service
const ddsUrlFetcherStub = Ember.Service.extend({
  fetchReadmeUrl(outputDir) {
    return {
      then(onData, onFail) {
        if (outputDir.stubHint == 'loaddata') {
          onData("MarkdownData")
        }
        if (outputDir.stubHint == 'showerror') {
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

moduleForComponent('job-output-readme', 'Integration | Component | job output readme', {
  integration: true,
  beforeEach: function () {
    this.register('service:dds-url-fetcher', ddsUrlFetcherStub);
    this.inject.service('dds-url-fetcher', { as: 'ddsUrlFetcher' });
  }
});

test('it renders loading', function(assert) {
  this.set('outputDir', {
    stubHint: 'neverload'
  });

  this.render(hbs`{{job-output-readme outputDir=outputDir}}`);
  assert.equal(this.$().text().trim(), 'Loading...');

  // Template block usage:
  this.render(hbs`
    {{#job-output-readme outputDir=outputDir}}
      template block text
    {{/job-output-readme}}
  `);
  assert.equal(this.$().text().trim().replace(/ +/, ''), 'Loading...\ntemplate block text');
});

test('it renders content for readme', function(assert) {
  this.set('outputDir', {
    stubHint: 'loaddata'
  });
  this.render(hbs`{{job-output-readme outputDir=outputDir}}`);
  assert.equal(this.$().text().trim(), 'MarkdownData');
});

test('it renders error on failure for readme', function(assert) {
  this.set('outputDir', {
    stubHint: 'showerror'
  });
  this.render(hbs`{{job-output-readme outputDir=outputDir}}`);
  assert.equal(this.$('.error-details').text().trim(), 'Not Found');
});
