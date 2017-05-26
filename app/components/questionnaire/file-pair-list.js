import Ember from 'ember';

const FilePairList = Ember.Component.extend({
  fieldName: null,
  provideAnswer: null,
  actions: {
    provide() {
      Ember.Logger.log('provide');
      this.get('provideAnswer')(this.get('fieldName'), '42');
    }
  }
});

FilePairList.reopenClass({
  positionalParams: ['fieldName','provideAnswer']
});

export default FilePairList;
