import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isLogin;
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
  }
  logInWithGoogle(): void {
    this.userService.onGoogleLogin().then(() => {
      this.userService.getUser().subscribe(user => {
        this.isLogin = user ? true : false;
      });
    });
  }

}
