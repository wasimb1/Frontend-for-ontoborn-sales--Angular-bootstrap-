import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  constructor() {}
  loggedUser = new BehaviorSubject<boolean>(false);

  checklogIn(loggedIn: boolean) {
    let userToken: any = localStorage.getItem('userToken');
    if (userToken == null || userToken == undefined || userToken.length < 0) {
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
