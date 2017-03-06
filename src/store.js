import { createStore } from 'redux';
import { loadState, saveState } from './local';

const ACTIONS = {
  ADD_COLOR: ({ colors, ...state }, { color }) => ({
    colors: [...colors, {
      id: Math.random().toString(36).substring(2),
      color,
    }],
    ...state,
  }),

  REMOVE_COLOR: ({ colors, ...state }, { color }) => ({
    colors: colors.filter(i => i !== color),
    ...state,
  }),

  CURRENT_COLOR: ({ current, ...state }, { color }) => ({
    current: color,
    ...state,
  }),

  SET_COLLECTION: ({ collection, ...state }, { toggleState }) => ({
    collection: toggleState,
    ...state,
  }),
};

const INITIAL = {
  colors: loadState('colors') || [],
  current: '',
  collection: false,
};

const store = createStore((state, action) => (
  action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());

store.subscribe(() => {
  saveState({
    colors: store.getState().colors,
  });
});

export default store;
