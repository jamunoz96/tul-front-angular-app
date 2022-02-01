import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCheckAuths } from './modules/auth/store/actions/auth.actions';
import { AuthState } from './modules/auth/store/reducer/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent  {
  constructor(private authStore: Store<AuthState>) {
    this.authStore.dispatch(loadCheckAuths());
  }
}