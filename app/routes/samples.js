import Ember from 'ember';
import { FileItem } from 'bespin-ui/utils/file-item-list';
import { FASTQFileItemList } from 'bespin-ui/utils/fastq-file-item-list';

const testNames = [
  'foobar_1.txt',
  'foobar_2.md5',
  'foobaz_3.fa',
  'foobaz_4.foo'
];

export default Ember.Route.extend({
  model() {
    const samples = FASTQFileItemList.create();
    testNames.forEach((name) => {
      const fileItem = FileItem.create({
        ddsFile: Ember.Object.create({
          name: name,
          prefix: 'bar',
          credential: 'baz',
          createJobInputFile() {
            return {'path': name};
          },
          cwlFileObject(prefix) {
            return {
              'class': 'File',
              'path': prefix + name
            };
          }
        })
      });
      samples.addFileItem(fileItem);
    });
    return samples;
  }
});
