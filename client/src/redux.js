import {
  combineReducers,
  createStore,
} from 'redux';

// Actions
export const saveUser = user => ({
  type: 'SAVE_USER',
  user,
});

export const deleteUser = () => ({
  type: 'DELETE_USER',
});

export const saveToken = token => ({
  type: 'SAVE_TOKEN',
  token,
});

export const deleteToken = () => ({
  type: 'DELETE_TOKEN',
});

export const saveCurrentUser = currentUser => ({
  type: 'SAVE_CURRENT_USER',
  currentUser,
});

export const deleteCurrentUser = currentUser => ({
  type: 'DELETE_CURRENT_USER',
  currentUser,
});

// Reducers
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

export const currentUser = (state = null, action) => {
  switch (action.type) {
    case 'SAVE_CURRENT_USER':
      return action.currentUser;
    case 'DELETE_CURRENT_USER':
      return null;
    default:
      return state;
  }
};

export const reducers = combineReducers({
  user,
  token,
  currentUser
});

// Store
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState);
  return store;
};

export const store = configureStore();