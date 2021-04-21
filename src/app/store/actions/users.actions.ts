import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../interfaces/interfaces';

export const loadUsers = createAction('[Users] loadUsers ');

export const loadUsersSuccess = createAction(
  '[Users] loadUsersSuccess ',
  props<{users: Usuario[]}>()
  );

export const loadUsersError = createAction(
  '[Users] loadUsersError ',
  props<{payload: any}>()
  );
