// app/session-stores/application.js
import CookieStore from 'ember-simple-auth/session-stores/cookie';

export default CookieStore.extend({
  cookieExpirationTime: 100,
  cookieName: 'bespinsession'
});
