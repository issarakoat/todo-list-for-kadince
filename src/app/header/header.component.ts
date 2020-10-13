import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUser = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.checkLogin();
    const unsub = this.userService.getUser().subscribe( user => {
      console.log(user);
      if (user !== null) {
        this.isUser = true;
      }
    });
    unsub.unsubscribe();
  }
  logout(): void{
    this.userService.onLogout().then(() => {
      console.log('succesfully logout');
      this.isUser = false;

    }).catch( err => {
      console.log(err);
    }).finally( () => {
      console.log('finally done');
      this.router.navigate(['welcome']);
  });
  }
}
