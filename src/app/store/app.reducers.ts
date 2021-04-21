import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {
   users: reducers.UsersState;
   user: reducers.UserState;
   ui: reducers.UiState;
   auth: reducers.AuthState;
}



export const appReducers: ActionReducerMap<AppState> = {
   users: reducers.usersReducer,
   user: reducers.userReducer,
   ui: reducers.uiReducer,
   auth: reducers.authReducer,
};

