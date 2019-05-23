import { resolve } from 'rsvp';
import Service from '@ember/service';

export default Service.extend({
  user: null,
  currentUser() {
    return resolve(this.get('user'));
  }
});
