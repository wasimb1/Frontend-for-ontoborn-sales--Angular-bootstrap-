import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  constructor() {}
  loggedUser = new BehaviorSubject<boolean>(false);

  checklogIn(loggedIn: boolean) {
    let cUser: any = localStorage.getItem('loggedUser');
    if (cUser == null || cUser == undefined || cUser.length < 0) {
      loggedIn = false;
      console.log('checkLogin if', loggedIn);
      this.loggedUser.next(loggedIn);
    } else {
      loggedIn = true;
      console.log('checkLogin else', loggedIn);
      this.loggedUser.next(loggedIn);
    }
  }
}
