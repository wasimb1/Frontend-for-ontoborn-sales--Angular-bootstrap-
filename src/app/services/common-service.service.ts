import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  public isLogged: boolean = false;
  loggedInUser: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.loggedInUser.subscribe((value) => {
      this.isLogged = value;
    });
  }

  toggleLogIn() {
    this.loggedInUser.next(!this.isLogged);
  }
}
