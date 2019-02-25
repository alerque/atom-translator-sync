'use babel';

import TranaslatorSyncView from './tranaslator-sync-view';
import { CompositeDisposable } from 'atom';

export default {

  tranaslatorSyncView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tranaslatorSyncView = new TranaslatorSyncView(state.tranaslatorSyncViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.tranaslatorSyncView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tranaslator-sync:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tranaslatorSyncView.destroy();
  },

  serialize() {
    return {
      tranaslatorSyncViewState: this.tranaslatorSyncView.serialize()
    };
  },

  toggle() {
    console.log('TranaslatorSync was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
