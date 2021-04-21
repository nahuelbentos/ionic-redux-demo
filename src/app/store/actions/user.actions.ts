import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../interfaces/interfaces';

export const loadUser = createAction(
  '[User] loadUser ',
  props<{ id: string }>()
);

export const loadUserSuccess = createAction(
  '[User] loadUserSuccess ',
  props<{ user: Usuario }>()
);

export const loadUserError = createAction(
  '[User] loadUserError ',
  props<{ payload: any }>()
);

export const createUser = createAction(
  '[User] CreateUser ',
  props<{ user: Usuario }>()
);

export const createUserError = createAction(
  '[User] CreateUserError ',
  props<{ payload: any }>()
);
