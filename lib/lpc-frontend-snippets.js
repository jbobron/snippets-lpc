'use babel';

import LpcFrontendSnippetsView from './lpc-frontend-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  lpcFrontendSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.lpcFrontendSnippetsView = new LpcFrontendSnippetsView(state.lpcFrontendSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.lpcFrontendSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'lpc-frontend-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.lpcFrontendSnippetsView.destroy();
  },

  serialize() {
    return {
      lpcFrontendSnippetsViewState: this.lpcFrontendSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('LpcFrontendSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
