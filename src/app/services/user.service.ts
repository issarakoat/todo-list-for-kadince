import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser = new BehaviorSubject<User>(null);
  isLogin = false;
  constructor(public afAuth: AngularFireAuth) {

  }
  onGoogleLogin(): Promise<void> {
    return this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        const user = new User(result.user.uid, result.user.email, result.user.displayName, result.user.photoURL);
        this.currentUser.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
      })
      .catch(err => {
        console.log(err);
      });
  }

  private isLoggedIn(): Promise<firebase.User> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
  async checkLogin(): Promise<void> {
    const user = await this.isLoggedIn();
    const userData: User = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      this.isLogin = true;
      this.currentUser.next(userData);
    } else {
      this.isLogin = false;
      this.currentUser.next(null);
    }
  }
  onGoogleLogout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.currentUser.next(null);
      localStorage.clear();
      this.isLogin = false;
    });
  }
  getUser(): BehaviorSubject<User> {
    return this.currentUser;
  }
}
