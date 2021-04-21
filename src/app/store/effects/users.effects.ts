/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usersActions from '../actions/users.actions';
import {  mergeMap, map, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';



@Injectable()
export class UsersEffects {

  constructor(
      private actions$: Actions,
      private userService: UserService
  ){}


  loadUsers$ = createEffect(
      () => this.actions$.pipe(
          ofType( usersActions.loadUsers ),
          mergeMap(
              () => this.userService.getUsers()
                  .pipe(
                      map( ({data: users}) => usersActions.loadUsersSuccess({ users }) ),
                      catchError( err => of(usersActions.loadUsersError({ payload: err })) )
                  )
          )
      )
  );

}
