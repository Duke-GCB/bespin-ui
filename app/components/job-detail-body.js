import { inject as service } from '@ember/service';
import Component from '@ember/component';

const JobDetailBody = Component.extend({
  tagName: 'div',
  classNames: ['job-detail-body'],
  job: null,
  user: service('user'),

  // Per https://emberigniter.com/render-promise-before-it-resolves/
  didInsertElement() {
    this._super(...arguments);
    this.get('user').currentUser().then(currentUser => {
      this.set('currentUser', currentUser);
    });
  }
});

JobDetailBody.reopenClass({
  positionalParams: ['job']
});

export default JobDetailBody;
