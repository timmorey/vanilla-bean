import Ember from 'ember';
import config from 'vanilla-bean/config/environment';

const {
  run,
  Component
} = Ember;

export default Component.extend({

  classNames: ['json-editor'],

  value: '',

  didInsertElement() {
    // Configure the path from which ace can load its worker/theme files as needed.
    //
    window.ace.config.set('basePath', config.baseURL + 'assets/ace');

    const editor = window.ace.edit('ace-editor');
    editor.setOptions({
      maxLines: Infinity,
      theme: 'ace/theme/mono_industrial'
    });

    const session = new window.ace.EditSession(this.get('value'));
    session.setMode('ace/mode/json');
    session.setTabSize(2);
    session.setUseWrapMode(true);
    session.on('change', () => {
      run.next(() => {
        this.set('value', editor.getValue());
      });
    });
    editor.setSession(session);
  }

});
