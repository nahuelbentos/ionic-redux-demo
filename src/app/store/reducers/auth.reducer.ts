/* eslint-disable no-underscore-dangle */
import { createReducer, on } from '@ngrx/store';
import { authenticate, authenticateWithGoogle, loginSuccess, logout } from '../actions/auth.actions';
import { IAuthenticate } from '../../interfaces/interfaces';

export interface AuthState {
  user: IAuthenticate;
  token: string;
  authenticated: boolean;
  redirectHome: boolean;
  error: any;
}

export const authInitialState: AuthState = {
  user: {},
  token: '',
  authenticated: false,
  redirectHome: false,
  error: null,
};

const _authReducer = createReducer(
  authInitialState,
  on(authenticate, (state, { data }) => ({ ...state, authenticated: true })),
  on(authenticateWithGoogle, (state) => ({ ...state, authenticated: true })),
  on(loginSuccess, (state, { token }) => ({ ...state, token, redirectHome: true })),
  on(logout, (state) => ({ ...state, user: null, token: null, authenticated: false, redirectHome: false })),
);

export const authReducer = (state, action) => _authReducer(state, action);
