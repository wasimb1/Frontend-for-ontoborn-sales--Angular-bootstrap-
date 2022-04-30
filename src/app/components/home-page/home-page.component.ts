import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkUserLogin();
  }

  checkUserLogin(){
    let cUser: any = localStorage.getItem('loggedUser');
          if (
            cUser == null ||
            cUser == undefined ||
            cUser.length < 0
          ) {
            this.router.navigate(['/sales']);
          }
  }
}
