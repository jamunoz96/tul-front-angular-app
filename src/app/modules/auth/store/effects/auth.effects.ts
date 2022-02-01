import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserModel } from '@tul/core/models/user.model';
import { AuthService } from '@tul/core/services/auth.service';
import {
  loadCheckAuths,
  loadCheckAuthsFailure,
  loadCheckAuthsSuccess,
  loadRegisterWithEmail,
  loadRegisterWithEmailFailure,
  loadRegisterWithEmailSuccess,
  loadSignInWithEmail,
  loadSignInWithEmailFailure,
  loadSignInWithEmailSuccess,
  loadSignouts,
  loadSignoutsFailure,
  loadSignoutsSuccess,
} from '../actions/auth.actions';
import { NotificationService } from '@tul/core/services/notification.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService
  ) { }

  // AUTH
  checkAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCheckAuths),
      switchMap(() => {
        return this.authService.checkAuth().pipe(
          map((user) => {
            if (user !== null) {
              const authUser: UserModel = {
                id: user.uid,
                email: user.email,
                name: user.displayName,
                photoUrl: user.photoURL,
              };
              return loadCheckAuthsSuccess({ data: { user: authUser } });
            } else {
              return loadCheckAuthsFailure({ error: 'Cancelled By User' });
            }
          }),
          catchError((e) => of(loadCheckAuthsFailure({ error: `${e}` })))
        );
      })
    );
  });


  // REGISTER
  registerEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRegisterWithEmail),
      switchMap(async (registerForm) => {
        return this.authService
          .registerEmail(registerForm)
          .then((res) => {
            if (res && res.user) {
              this.notification.createNotification("success", "Operación exitosa", "Se registro la cuenta correctamente");
              return loadRegisterWithEmailSuccess();
            } else {
              this.notification.createNotification("error", "Operación fallida", "Se produjo un error al tratar de registrar");
              return loadRegisterWithEmailFailure({
                error: 'CANCELLED BY USER',
              });
            }
          })
          .catch((e) => {
            this.notification.createNotification("error", "Operación fallida", "Se produjo un error al tratar de registrar");
            return loadRegisterWithEmailFailure({ error: `${e}` });
          });
      })
    );
  });

  registerWithEmailSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadRegisterWithEmailSuccess),
        tap(() => this.router.navigate(['/shop']))
      );
    },
    {
      dispatch: false,
    }
  );

  // LOGIN
  signInEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSignInWithEmail),
      switchMap(async (loginForm) => {
        return this.authService
          .signInEmail(loginForm)
          .then((res) => {
            if (res && res.user) {
              const authUser: UserModel = {
                id: res.user.uid,
                email: res.user.email,
                name: res.user.displayName,
                photoUrl: res.user.photoURL,
              };
              this.notification.createNotification("success", "Operación exitosa", "Se inició sesión correctamente");
              return loadSignInWithEmailSuccess({ data: { user: authUser } });
            } else {
              this.notification.createNotification("error", "Operación fallida", "Se produjo un error al tratar de iniciar sesión");
              return loadSignInWithEmailFailure({
                error: 'CANCELLED BY USER',
              });
            }
          })
          .catch((e) => {
            console.log("error", e)
            this.notification.createNotification("error", "Operación fallida", "Se produjo un error al tratar de iniciar sesión");
            return loadSignInWithEmailFailure({ error: `${e}` });
          });
      })
    );
  });

  signInWithEmailSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(loadSignInWithEmailSuccess),
        tap(() => this.router.navigate(['/shop']))
      );
    },
    {
      dispatch: false,
    }
  );

  // LOGOUT
  signout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSignouts),
      switchMap(async () => {
        return this.authService
          .signout()
          .then(() => {
            this.notification.createNotification("success", "Operación exitosa", "Se cerró sesión correctamente");
            return loadSignoutsSuccess();
          })
          .catch((e) => {
            return loadSignoutsFailure({ error: `${e}` });
          });
      })
    );
  });

  signoutSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(loadSignoutsSuccess),
        tap(() => this.router.navigate(['/auth/login']))
      );
    },
    {
      dispatch: false,
    }
  );
}
