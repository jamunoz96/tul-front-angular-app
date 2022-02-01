import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgZorroAntdModule } from '@tul/modules/ng-zorro/ng-zorro-antd.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authFeatureKey, reducer } from './store/reducer/auth.reducer';
import { AuthEffects } from './store/effects/auth.effects';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    StoreModule.forFeature(authFeatureKey, reducer),
    EffectsModule.forFeature([
      AuthEffects
    ]),
  ]
})
export class AuthModule { }
