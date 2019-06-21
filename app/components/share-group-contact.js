import { computed } from '@ember/object';
import Component from '@ember/component';

const ShareGroupContact = Component.extend({
  shareGroup: null,
  classNames: ['share-group-contact'],
  tagName: 'a',
  attributeBindings: ['href'],
  href: computed('shareGroup.email', function() {
    return `mailto:${this.get('shareGroup.email')}`;
  })
});

ShareGroupContact.reopenClass({
  positionalParams: ['shareGroup']
});

export default ShareGroupContact;
