import { h, render } from 'preact';
import { Provider } from 'preact-redux';

import store from './store';
import reducers from './reducers';

import Toolbar from './components/Toolbar';
import Detector from './components/Detector';
import CollectionModal from './components/CollectionModal';
import Target from './components/Target';

window.store = store;

render((
  <div id="root">
    <Provider store={store}>
      <div id="app">
        <Toolbar />
        <Detector />
        <Target />
        <CollectionModal />
      </div>
    </Provider>
  </div>
), document.body);
