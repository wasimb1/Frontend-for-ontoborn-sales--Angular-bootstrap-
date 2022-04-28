import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any;
  logged: boolean = true;
  messageReceived: any;

  constructor(
    private router: Router,
    private comonService: CommonServiceService
  ) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('loggedUser') == null ||
      localStorage.getItem('loggedUser') == undefined
    ) {
      this.logged = false;
    } else {
      console.log('locallalal');
      let cUser: any = localStorage.getItem('loggedUser');
      this.user = JSON.parse(cUser);
    }
    console.info(this.user);
  }

  get isSidebarVisible(): boolean {
    return this.comonService.isLogged;
  }

  toggleLogg() {
    this.comonService.toggleLogIn();
  }

  logout() {
    console.log(this.user);
    localStorage.removeItem('loggedUser');
    this.logged = false;

    this.router.navigate(['/home']);
  }
}
