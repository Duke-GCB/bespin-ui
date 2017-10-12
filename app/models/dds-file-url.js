import DS from 'ember-data';

export default DS.Model.extend({
  httpVerb: DS.attr('string'),
  host: DS.attr('string'),
  url: DS.attr('string'),
  httpHeaders: DS.attr('string')
});
