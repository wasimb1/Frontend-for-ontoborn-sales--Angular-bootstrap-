import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any;
  logged: boolean = false;
  // private loggedInUser: Subscription = new Subscription;

  constructor(
    private router: Router,
    private commonService: CommonServiceService
  ) {
    // this.loggedInUser = this.comonService.getUpdate().subscribe(
    //   value => {
    //     this.logged = value;
    //   }
    // );
    this.commonService.loggedUser.subscribe((loggedUser) => {
      this.logged = loggedUser;
      console.log('header logged subs', this.logged);
    });
    console.log('header logged', this.logged);
  }

  ngOnInit(): void {}

  logout() {
    console.log(this.user);
    localStorage.removeItem('userToken');
    this.logged = false;
    this.commonService.loggedUser.next(this.logged);
    console.log('inside header logout', this.logged);
    this.router.navigate(['']);
  }
}
