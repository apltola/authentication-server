import { FETCH_USER, AUTH_USER, AUTH_ERROR } from '../actions/types';

export const auth = (state = null, action) => {
  console.log({action});

  switch(action.type) {
    case FETCH_USER:
      return action.payload || false;

    case AUTH_USER:
      return action.payload || false;

    default: return state;
  }
}