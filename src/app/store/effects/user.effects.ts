/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as userActions from '../actions';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUser),
      mergeMap((action ) => this.userService.getUserById( action.id )
          .pipe(
            map( ({data: user}) => userActions.loadUserSuccess({ user })),
            catchError( err => of(userActions.loadUserError( {payload: err} )))
          )
      )
    ));

  createUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(userActions.createUser),
    mergeMap((action) => this.userService.createUser( action.user )
      .pipe(
        tap(data => console.log(data)),
        map( ({ message }) => userActions.showToast({ message })),
        catchError( err => of(userActions.createUserError( {payload: err} )))
     )
   )
  )
  );
}
