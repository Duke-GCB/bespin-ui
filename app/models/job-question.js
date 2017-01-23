import DS from 'ember-data';

export default DS.Model.extend({
  key: DS.attr('string'),
  name: DS.attr('string'),
  dataType: DS.attr('string'),
  occurs: DS.attr('number'),
  isFile: Ember.computed('dataType', function() { return this.get('dataType') === 'File'; })

});
