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

  authenticate(username, password) {
    // resolve with object containing token if successful, reject if not
    return new Ember.RSVP.Promise((resolve, reject) => {
      // Make an ajax call
      // I guess we just use jquery?
      Ember.$.ajax({
        url: ENV.APP.API_URL + '/api-auth-token/', // DRF endpoint, should be confirgurable
        type: 'POST',
        data: JSON.stringify({
          username: username,
          password: password
        }),
        contentType: 'application/json',
        dataType: 'json'
      }).then((response) => {
        Ember.run(function() { //what is this?
          resolve({
            token: response.token
          });
        });
      }, (xhr, status) => {
        let response = xhr.responseText || status;
        Ember.run(function() { // again what?
          reject(response);
        });
      });
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
