/**
 * Authenticator that reads token created by bespin-api.
 * Typically an authenticator would have an authenticate method.
 * We do not need this since bespin-api creates a cookie in the format needed by this authenticator.
 */
import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from 'bespin-ui/config/environment'; // Yes this is how to do it

export default Base.extend({
  // These are expected to return promises
  restore(data) {
    // resolve if data.token is not empty, otherwise reject
    // copied from https://www.smallsurething.com/making-ember-and-django-play-nicely-together-a-todo-mvc-walkthrough/
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  invalidate(data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (!Ember.isEmpty(data.token)) {
        delete data.token;
        resolve(data);
      } else {
        reject();
      }
    });
  }
});
