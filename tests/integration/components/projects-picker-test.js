import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('projects-picker', 'Integration | Component | projects picker', {
  integration: true
});

test('it renders with no projects', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('projects', []);
  this.render(hbs`{{projects-picker projects }}`);
  assert.equal(this.$('').text().trim(), 'Selected Project:', 'renders only the selected project');
});

test('it renders with selected project', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('project', {id:1, name:'Project1'};)
  this.set('projects', [this.get('project')]);
  this.render(hbs`{{projects-picker projects selectedProject=project }}`);
  assert.equal(this.$('p').text().trim(), 'Selected Project: Project1', 'selected project name matches');
});
