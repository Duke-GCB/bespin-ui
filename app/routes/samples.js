import Ember from 'ember';
import { makeSamplePair } from 'bespin-ui/utils/fastq-file-item-list';


const group1 = [
  Ember.Object.create({ name: 'foobar', file: {name:'foobar.txt'}}),
  Ember.Object.create({ name: 'foobar', file: {name:'foobar.md5'}})
];

const group2 = [
  Ember.Object.create({ name: 'foobaz', file: {name:'foobaz.txt'}}),
  Ember.Object.create({ name: 'foobaz', file: {name:'foobaz.md5'}})
];

const pairs = [
  makeSamplePair(group1, 'file'),
  makeSamplePair(group2, 'file')
];


export default Ember.Route.extend({
  model() {
    return pairs
  }
});
