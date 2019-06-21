import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | dds/dds project picker', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('projects', []);
    await render(hbs`{{dds/dds-project-picker}}`);
    assert.equal(this.$('option').text().trim(), '-- Select a Project --');
  });

  test('it renders with selected project', async function(assert) {
    let projects = [{id:1, name:'Project1'}, {id:2, name:'Project2'}];
    this.set('project', projects[0]);
    this.set('projects', projects);
    await render(hbs`{{dds/dds-project-picker projects selectedProject=project }}`);
    assert.equal(this.$(':selected').text().trim(), 'Project1', 'selected project name matches');
    assert.equal(this.$('option').length, 3, 'should render 3 options');
  });
});
