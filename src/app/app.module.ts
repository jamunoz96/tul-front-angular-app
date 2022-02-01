import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from './modules/ng-zorro/ng-zorro-antd.module';
import { StoreModule } from '@ngrx/store';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthModule } from './modules/auth/auth.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from './core/services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { rootReducer } from './modules/shop/store/reducer/root.reducer';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgZorroAntdModule,
    AngularFireAuthModule,
    AuthModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
