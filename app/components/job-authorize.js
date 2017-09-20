import Ember from 'ember';

const JobAuthorize = Ember.Component.extend({
  tagName: 'div',
  classNames: ['job-authorize'],
  token: '',
  actions: {
    authorize() {
      const token = this.get('token');
      this.get('job').authorize(token);
    }
  }
});

JobAuthorize.reopenClass({
  positionalParams: ['job']
});


export default JobAuthorize;
