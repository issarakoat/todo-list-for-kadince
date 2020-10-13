import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { RegisterInfo } from '../models/register-info.model';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser = new BehaviorSubject<User>(null);
  isLogin = false;
  isAdmin = new BehaviorSubject(false);
  constructor(public afAuth: AngularFireAuth) {

  }
  getAdminStatus(): BehaviorSubject<boolean> {
    const userData: User = JSON.parse(localStorage.getItem('userData'));
    environment.admins.forEach(user => {
      if (userData.email === user.email) {
        this.isAdmin.next(true);
        return this.isAdmin;
      }
    });
    return this.isAdmin;
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

  onLogin(user: RegisterInfo): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password).then(res => {
      if (!res.user.emailVerified) {
        alert('please check your email to verify the account');
      }
      if (res.user.email && res.user.emailVerified) {
        const usr = new User(res.user.uid, res.user.email);
        this.currentUser.next(usr);
        localStorage.setItem('userData', JSON.stringify(user));
        this.isLogin = true;
      }
    });
  }
  onGoogleLogout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.currentUser.next(null);
      localStorage.clear();
      this.isLogin = false;
    });
  }
  onLogout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.currentUser.next(null);
      this.isLogin = false;
      localStorage.clear();
    });
  }
  onRegister(info: RegisterInfo): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(info.email, info.password).then(val => {
      console.log(val.user.emailVerified);
      val.user.sendEmailVerification();
    });
  }
  onSendResetPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email).then(() => {
      console.log('send reset password');
    });
  }
  getUser(): BehaviorSubject<User> {
    return this.currentUser;
  }
}
