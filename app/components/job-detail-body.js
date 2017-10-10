import Ember from 'ember';

const JobDetailBody = Ember.Component.extend({
  tagName: 'div',
  classNames: ['job-detail-body'],
  job: null,
  user: Ember.inject.service('user'),

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
