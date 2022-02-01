import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadRegisterWithEmail } from '../../store/actions/auth.actions';
import { AuthState } from '../../store/reducer/auth.reducer';
import { getAuthLoading } from '../../store/selector/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister!: FormGroup;
  authLoading: Observable<boolean>;
  constructor(private fb: FormBuilder, private authStore: Store<AuthState>) {
    this.authLoading = this.authStore.select(getAuthLoading);
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    if (this.formRegister.valid) {
      this.registerWithEmail(this.formRegister.value);
    } else {
      Object.values(this.formRegister.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  registerWithEmail(loginValue: object) {
    this.authStore.dispatch(loadRegisterWithEmail({data: loginValue}));
  }

}
