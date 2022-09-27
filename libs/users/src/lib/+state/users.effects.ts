import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'

import * as UsersActions from './users.actions'
import * as UsersFeature from './users.reducer'
import {catchError, EMPTY, map, of, switchMap, tap} from 'rxjs'
import {UsersService} from '../services/users.service'
import {LocalStorageService} from '../services/local-storage.service'

@Injectable()
export class UsersEffects {
  constructor(
    private readonly actions$: Actions,
    private localStorageService: LocalStorageService,
    private usersService: UsersService
  ) {}

  buildUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      switchMap(() => {
        if (this.localStorageService.isTokenValid()) {
          const userId = this.localStorageService.getUserIdFromToken()
          if (userId) {
            return this.usersService.getUser(userId).pipe(
              map(user => {
                return UsersActions.buildUserSessionSuccess({user: user})
              }),
              catchError(() => of(UsersActions.buildUserSessionFailure()))
            )
          }
          return of(UsersActions.buildUserSessionFailure())
        } else {
          return of(UsersActions.buildUserSessionFailure())
        }
      })
    )
  )
}

/*
    this.actions$.pipe(
      ofType(UsersActions.initUsers),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return UsersActions.loadUsersSuccess({users: []})
        },
        onError: (action, error) => {
          console.error('Error', error)
          return UsersActions.loadUsersFailure({error})
        }
      })
    )
  )

     */
