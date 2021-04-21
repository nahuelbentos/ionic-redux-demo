import { createAction, props } from '@ngrx/store';
import { IAuthenticateExternal } from '../../interfaces/interfaces';

export const authenticate = createAction(
  '[Auth] Authenticate ',
  props<{ data: IAuthenticateExternal }>()
);

export const authenticateWithGoogle = createAction(
  '[Auth] Authenticate With Google '
);

export const loginSuccess = createAction(
  '[Auth] Login Success ',
  props<{ token: string }>()
);

export const logout = createAction('[Auth] Logout ');
export const logoutSuccess = createAction('[Auth] Logout Sucess  ');

