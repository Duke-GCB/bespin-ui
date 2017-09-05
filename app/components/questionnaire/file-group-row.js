import Ember from 'ember';

const FileGroupRow = Ember.Component.extend({
  groupTitle: Ember.computed('groupName', function() {
    const groupName = this.get('groupName');
    if (groupName) {
      return groupName.capitalize();
    }
    return "Group"
  }),
  groupIndex: 0,
  displayIndex: Ember.computed('groupIndex', function() {
    return this.get('groupIndex') + 1;
  }),
  classNames: ['file-group-row', 'well','well-sm'],
  group: null,
  onClick: (/* groupIndex, fileIndex*/) => {},
  actions: {
    click: function(index) {
      this.get('onClick')(this.get('groupIndex'), index);
    }
  }
});

FileGroupRow.reopenClass({
  positionalParams: ['group', 'groupIndex', 'onClick']
});

export default FileGroupRow;
