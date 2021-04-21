/* eslint-disable no-underscore-dangle */
import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../../interfaces/interfaces';
import { createUser, createUserError } from '../actions/user.actions';
import {
  loadUser,
  loadUserSuccess,
  loadUserError,
} from '../actions';

export interface UserState {
  id: string;
  user: Usuario;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const userInitialState: UserState = {
  id: null,
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

const _userReducer = createReducer(
  userInitialState,

  on(loadUser, (state, {id}) => ({ ...state, loading: true, id })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...user },
  })),
  on(loadUserError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  })),
  on(createUser, (state, {user}) => ({ ...state, user}) ),
  on(createUserError, (state, {payload}) => ({ ...state, user: null, error: payload}) )
);

export const userReducer = (state, action) => _userReducer(state, action);
