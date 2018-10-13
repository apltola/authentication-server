import axios from 'axios';
import { FETCH_USER, AUTH_USER } from './types';

export const fetchUser2 = () => {
  //kun kutsutaan fetchUser, palautetaan tää funktio
  //kun redux thunk näkee että me palautetaan action creatorista funktio, se kutsuu sen ja laittaa argumentiksi dispatchin
  return function(dispatch) {
    axios.get('/api/current_user').then(res => {
      dispatch({ type: FETCH_USER, payload: res.data })
    });
  }
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  console.log('res.data: ', res.data);  
  dispatch({ type: FETCH_USER, payload: res.data });
}

export const setAuth = data => async dispatch => {
  dispatch({ type: AUTH_USER, payload: data });
}