/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as authActions from '../actions';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { authenticate, loginSuccess } from '../actions/auth.actions';
import { UiService } from '../../services/ui.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
    private authService: AuthService,
    private uiService: UiService,
    ) {}

  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.authenticate),
      tap((data) => console.log('effect: ', data)),
      mergeMap((action) => {
        console.log('mergeMap:: action, ', action);

        return this.authService.authenticate(action.data).pipe(
          tap((data) => console.log('authenticate: ', data)),
          map(({ jwtToken }: any) => {
            this.authService.setToken(jwtToken);
            return loginSuccess({ token: jwtToken });
          }),
          catchError((err) => {
            console.log(' catchError err: ', err);
            return of(authActions.loadUserError({ payload: err }));
          })
        );
      })
    )
  );

  authenticateWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.authenticateWithGoogle),
      tap((res) => console.log('authenticateWithGoogle effect: ', res)),
      mergeMap((action) => {
        console.log('mergeMap:: authenticateWithGoogle action, ', action);

        return of(this.authService.loginFirebaseGogle()).pipe(
          tap(async (resFb) =>
            console.log('authenticateWithGoogle: ', await resFb)
          ),

          switchMap(async (resFb) => {
            console.log(' hola resFb : ', await resFb);
            const { user } = await resFb;
            const authProviderToken = await user.getIdToken();
            console.log(
              '     1) id que hay que mandarle al back => getIdToken: ',
              authProviderToken
            );
            const data = {
              username: user.email,
              loginWith: 'GOOGLE',
              authProviderToken,
            };

            return authenticate({ data });
          }),

          catchError((err) => of(authActions.loadUserError({ payload: err })))
        );
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logout),
      mergeMap(() =>
        this.authService.logout().pipe(
          map(() => authActions.logoutSuccess()),
          catchError((err) => of(authActions.loadUserError({ payload: err })))
        )
      )
    )
  );

}
