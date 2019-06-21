import { computed } from '@ember/object';
import Component from '@ember/component';

const FileGroupRow = Component.extend({
  classNames: ['file-group-row', 'well','well-sm'],
  groupName: "",
  groupTitle: computed('groupName', function() {
    const groupName = this.get('groupName');
    if (!groupName) {
      return 'Group';
    }
    return groupName.capitalize();
  }),
  groupIndex: 0,
  displayIndex: computed('groupIndex', function() {
    return this.get('groupIndex') + 1;
  }),
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
