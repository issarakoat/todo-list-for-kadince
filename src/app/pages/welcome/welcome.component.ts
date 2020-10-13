import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterInfo } from '../../models/register-info.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isLogin;
  IsforgotPassword = false;
  @ViewChild('submitForm', { static: false }) form: NgForm;
  constructor(private userService: UserService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.checkLogin().then( () => {
      this.userService.getUser().subscribe( user => {
        this.isLogin = user ? true : false;
        if (this.isLogin){
          this.router.navigate(['todo-list']);
        }
      });
    });
    this.activateRoute.params.subscribe(params => {
      if (params.email !== undefined) {
        setTimeout(() => {
          this.form.form.patchValue({
            email: params.email,
          });
        });
      }
    });
  }
  logInWithGoogle(): void {
    this.userService.onGoogleLogin().then(() => {
      this.userService.getUser().subscribe(user => {
        this.isLogin = user ? true : false;
      });
    });
  }
  onLogin(user: RegisterInfo): void {
    this.userService.onLogin(user).then( () => {
      // now direct to the app
      this.router.navigate(['todo-list']);
    }).catch(err => {
      alert(err.message);
      this.form.form.patchValue({
        password: ''
      });
      this.IsforgotPassword = true;
    });
  }
  onForgotPassword(info: RegisterInfo): void {
    this.userService.onSendResetPassword(info.email).then( () => {
      alert('Please check your email, we sent reset password link for you');
    });
  }

}
