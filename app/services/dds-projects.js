import { resolve } from 'rsvp';
import Service, { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),
  projects() {
    return this.get('store').findAll('dds-project').then(projects => {
      return resolve(projects.sortBy('name'));
    });
  }
});
