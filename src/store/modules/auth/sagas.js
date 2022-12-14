import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import { api } from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
 const { email, pw } =  payload
  try {
    const response = yield call(api.post, 'user/authenticate', {}, {
      headers: {
      "email": email,
      "password": pw
     }}
    )
    const { token, ...users } = response.data.dataResult;

    api.defaults.headers.Authorization = `Bearer ${token} `;

    yield put(signInSuccess(token, users));
    history.push('/home');
  } catch (err) {
    toast.error('Falha na autenticação verifique seus dados');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;

  if (token) {
    // api.defaults.headers = `Bearer ${token}`;
    api.defaults.headers.Authorization = `Bearer ${token} `;
  }
}

export function signOut() {
  history.push('/login');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
