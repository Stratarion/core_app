import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const googlesignin = (googleData, router) => async (dispatch) => {
  try {
    await api.googlesignin(googleData);
    dispatch({ type: AUTH, data: googleData });
    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
