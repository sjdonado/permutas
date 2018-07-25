import {
  combineReducers,
  createStore,
} from 'redux';

// actions.js
export const saveUser = user => ({
  type: 'SAVE_USER',
  user,
});

export const saveToken = token => ({
  type: 'SAVE_TOKEN',
  token,
});

export const deleteUser = () => ({
  type: 'DELETE_USER',
});

export const deleteToken = () => ({
  type: 'DELETE_TOKEN',
});

// reducers.js
export const user = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      return action.user;
    case 'DELETE_USER':
      return {};
    default:
      return state;
  }
};

export const token = (state = null, action) => {
  switch (action.type) {
    case 'SAVE_TOKEN':
      return action.token;
    case 'DELETE_TOKEN':
      return null;
    default:
      return state;
  }
};

export const reducers = combineReducers({
  user,
  token
});

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState);
  return store;
};

export const store = configureStore();