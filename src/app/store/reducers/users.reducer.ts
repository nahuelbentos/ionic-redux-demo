/* eslint-disable no-underscore-dangle */
import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess,loadUsersError } from '../actions';
import { Usuario } from '../../interfaces/interfaces';



export interface UsersState {
    users: Usuario[];
    loaded: boolean;
    loading: boolean;
    error: any;
};

export const usersInitialState: UsersState = {
   users: [],
  loaded: false,
  loading: false,
  error: null
};

const _usersReducer = createReducer(usersInitialState,

    on(loadUsers, state => ({ ...state, loading: true})),
    on(loadUsersSuccess, (state, {users}) => ({ ...state, loading: false, loaded: true, users: [...users]})),
    on(loadUsersError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        error: {
          url: payload.url,
          name: payload.name,
          message: payload.message,
         }})),

);

export const usersReducer = (state, action) => _usersReducer(state, action);
