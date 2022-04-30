import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ontoborn-sales';
  loggedIn: boolean = false;

  constructor(){
   
    this.checkUserLogin();
  }
  
  checkUserLogin(){
    let cUser: any = localStorage.getItem('loggedUser');
          if (
            cUser == null ||
            cUser == undefined ||
            cUser.length < 0
          ) {
            this.loggedIn = false;
          } else {
            this.loggedIn = true;
          }
  }
}
