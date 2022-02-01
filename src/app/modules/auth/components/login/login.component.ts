import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadSignInWithEmail } from '../../store/actions/auth.actions';
import { AuthState } from '../../store/reducer/auth.reducer';
import { getAuthLoading } from '../../store/selector/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  authLoading: Observable<boolean>;
  constructor(private fb: FormBuilder, private authStore: Store<AuthState>) {
    this.authLoading = this.authStore.select(getAuthLoading);
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ["jandres_m@hotmail.com", [Validators.required, Validators.email]],
      password: ["1234567", [Validators.required]]
    });
  }

  submitForm(): void {
    if (this.formLogin.valid) {
      this.signInWithEmail(this.formLogin.value);
    } else {
      Object.values(this.formLogin.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  signInWithEmail(loginValue: object) {
    this.authStore.dispatch(loadSignInWithEmail({data: loginValue}));
  }

}
