import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  uuid() { return faker.random.uuid(); },
  name() { return faker.company.catchPhrase(); },
  description() { return faker.lorem.paragraph(); }
});
