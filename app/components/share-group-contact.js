import Ember from 'ember';

const ShareGroupContact = Ember.Component.extend({
  shareGroup: null,
  classNames: ['share-group-contact'],
  tagName: 'a',
  attributeBindings: ['href'],
  href: Ember.computed('shareGroup.email', function() {
    return `mailto:${this.get('shareGroup.email')}`;
  })
});

ShareGroupContact.reopenClass({
  positionalParams: ['shareGroup']
});

export default ShareGroupContact;
