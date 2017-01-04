import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dds/dds-project-picker', 'Integration | Component | dds/dds project picker', {
  integration: true
});

test('it renders', function(assert) {
  this.set('projects', []);
  this.render(hbs`{{dds/dds-project-picker}}`);
  assert.equal(this.$('option').text().trim(), '-- Select a Project --');
});

test('it renders with selected project', function(assert) {
  let projects = [{id:1, name:'Project1'}, {id:2, name:'Project2'}];
  this.set('project', projects[0]);
  this.set('projects', projects);
  this.render(hbs`{{dds/dds-project-picker projects selectedProject=project }}`);
  assert.equal(this.$(':selected').text().trim(), 'Project1', 'selected project name matches');
  assert.equal(this.$('option').length, 3, 'should render 3 options');
});
