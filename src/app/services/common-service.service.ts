import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserModule } from '../modules/user/user.module';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  constructor() {}
  loggedUser = new BehaviorSubject<boolean>(false);
  loggedInUser = new BehaviorSubject<UserModule>(new UserModule());

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

  checkLoggedInUser(user: UserModule) {
    let userToken: any = localStorage.getItem('userToken');
    if (userToken == null || userToken == undefined || userToken.length < 0) {
      console.log('checkLogin if', user);
      let userModule = new UserModule();
      this.loggedInUser.next(userModule);
    } else {
      console.log('checkLogin else', user);
      this.loggedInUser.next(user);
    }
  }
}
