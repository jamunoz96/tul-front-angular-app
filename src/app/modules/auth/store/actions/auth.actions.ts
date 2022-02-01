import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/core/models/user.model';


// SESSION
export const loadCheckAuths = createAction('[CheckAuth] Load CheckAuths');
export const loadCheckAuthsSuccess = createAction(
    '[CheckAuth] Load CheckAuths Success',
    props<{
        data: {
            user: UserModel;
        };
    }>()
);
export const loadCheckAuthsFailure = createAction(
    '[CheckAuth] Load CheckAuths Failure',
    props<{ error: string }>()
);

// REGISTER
export const loadRegisterWithEmail = createAction(
    '[RegisterWithEmail] Load RegisterWithEmail',
    props<{
        data: object
    }>()
);
export const loadRegisterWithEmailSuccess = createAction(
    '[RegisterWithEmail] Load RegisterWithEmail Success'
);
export const loadRegisterWithEmailFailure = createAction(
    '[RegisterWithEmail] Load RegisterWithEmail Failure',
    props<{ error: string }>()
);

// LOGIN
export const loadSignInWithEmail = createAction(
    '[SignInWithEmail] Load SignInWithEmail',
    props<{
        data: object
    }>()
);
export const loadSignInWithEmailSuccess = createAction(
    '[SignInWithEmail] Load SignInWithEmail Success',
    props<{
        data: {
            user: UserModel;
        };
    }>()
);
export const loadSignInWithEmailFailure = createAction(
    '[SignInWithEmail] Load SignInWithEmail Failure',
    props<{ error: string }>()
);

// LOGOUT
export const loadSignouts = createAction('[Signout] Load Signouts');
export const loadSignoutsSuccess = createAction(
    '[Signout] Load Signouts Success'
);
export const loadSignoutsFailure = createAction(
    '[Signout] Load Signouts Failure',
    props<{ error: string }>()
);
