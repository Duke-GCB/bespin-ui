import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  session: Ember.inject.service('session'),
  authorize(data, block) { // what is block?
    Ember.Logger.info('authorize!');
    if(this.get('session.isAuthenticated') && !Ember.isEmpty(data.token)) {
      block('Authorization', 'Token ' + data.token);
    }
  }
});
