import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['article-editor'],

  article: null,

  isEditingMetadata: false,
  isEditingContent: true,

  actions: {

    editMetadata() {
      this.setProperties({
        isEditingMetadata: true,
        isEditingContent: false
      });
    },

    editContent() {
      this.setProperties({
        isEditingMetadata: false,
        isEditingContent: true
      });
    },

    save() {
      this.sendAction('save');
    },

    discardChanges() {
      this.sendAction('discardChanges');
    },

    editorKeyDown(e) {
      if (e.keyCode === 9) {
        e.preventDefault();

        const textarea = this.$('.content-editor textarea')[0];

        if (!e.shiftKey && textarea.selectionStart === textarea.selectionEnd) {
          const newSelectionStart = textarea.selectionStart + 2;
          textarea.value = textarea.value.substring(0, textarea.selectionStart) + '  ' + textarea.value.substring(textarea.selectionEnd);
          textarea.selectionStart = newSelectionStart;
          textarea.selectionEnd = newSelectionStart;
          return;
        }

        let firstLineStart = textarea.value.lastIndexOf('\n', textarea.selectionStart - 1);
        firstLineStart = firstLineStart === -1 ? 0 : firstLineStart + 1;

        const lines = textarea.value.substring(firstLineStart, textarea.selectionEnd).split('\n');
        let newSelectionStart = textarea.selectionStart;
        let newSelectionEnd = textarea.selectionEnd;

        for (let i = 0; i < lines.length; i++) {
          if (e.shiftKey) {
            if (lines[i].startsWith('  ')) {
              lines[i] = lines[i].substring(2);
              newSelectionStart = i === 0 ? newSelectionStart - 2 : newSelectionStart;
              newSelectionEnd -= 2;
            } else if (lines[i].startsWith('\t') || lines[i].startsWith(' ')) {
              lines[i] = lines[i].substring(1);
              newSelectionStart = i === 0 ? newSelectionStart - 1 : newSelectionStart;
              newSelectionEnd -= 1;
            }
          } else {
            lines[i] = '  ' + lines[i];
            newSelectionStart = i === 0 ? newSelectionStart + 2 : newSelectionStart;
            newSelectionEnd += 2;
          }
        }

        textarea.value = textarea.value.substring(0, firstLineStart) +
          lines.join('\n') +
          textarea.value.substring(textarea.selectionEnd);
        textarea.selectionStart = newSelectionStart;
        textarea.selectionEnd = newSelectionEnd;
      }
    }

  }

});
