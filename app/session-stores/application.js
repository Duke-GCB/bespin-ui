// app/session-stores/application.js
import CookieStore from 'ember-simple-auth/session-stores/cookie';
import ENV from 'bespin-ui/config/environment';

export default CookieStore.extend({
  cookieExpirationTime: 7200,
  cookieName: 'bespinsession'
});
