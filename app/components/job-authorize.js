import Ember from 'ember';

const JobAuthorize = Ember.Component.extend({
  tagName: 'div',
  classNames: ['job-authorize'],
  errors: [],
  formGroupClassNames: Ember.computed('errors.[]', function() {
    const base = 'job-authorize-group form-inline';
    if(this.get('errors.length') == 0) {
      return base;
    } else {
      return `${base} has-error`;
    }
  }),
  job: null,
  _token: '',
  token: Ember.computed('job.hasAuthorization', 'job.runToken', '_token', {
    /*
      The token for this component is a custom computed property.

      Authorized jobs include the token string as a read-only field of the job object
      The field is read-only so that clients cannot set it directly. Instead, clients call job.authorize(token).
      Since we can't bind directly to the job's runToken field, we override the setter to store locally
      and switch the getter to return the token based on the state.
     */
    get(/* key */) {
      if(this.get('job.hasAuthorization')) {
        // Job has been authorized, return the token from the job.
        return this.get('job.runToken');
      } else {
        // Job has not yet been authorized, return our local variable
        return this.get('_token')
      }
    },
    set(key, value) {
      // Only set the local variable if job does not yet have authorization.
      // If job has been authorized this is effectively read-only
      if(this.get('job.hasAuthorization')) {
        return this.get('job.runToken');
      } else {
        this.set('_token', value);
        return value;
      }
    }
  }),
  actions: {
    authorize() {
      const token = this.get('token');
      this.get('job').authorize(token).then(()=> { /* succeeded */ }, (error) => {
        this.set('errors', error.errors);
      });
    }
  }
});

JobAuthorize.reopenClass({
  positionalParams: ['job']
});


export default JobAuthorize;
