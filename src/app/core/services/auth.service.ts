import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  checkAuth(): Observable<firebase.User | null> {
    return this.auth.authState;
  }

  async signInEmail(loginForm: any): Promise<firebase.auth.UserCredential | null> {
    return this.auth.signInWithEmailAndPassword(loginForm.data.email, loginForm.data.password)
  }

  async registerEmail(registerForm: any): Promise<firebase.auth.UserCredential | null> {
    return this.auth.createUserWithEmailAndPassword(registerForm.data.email, registerForm.data.password)
  }

  async signout(): Promise<void> {
    await this.auth.signOut();
  }
}
