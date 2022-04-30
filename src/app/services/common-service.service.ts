import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  loggedInUser: Subject<boolean> = new Subject<boolean>();

  sendUpdate(loggedIn: boolean){
    console.log("sendUpdate", loggedIn);
    this.loggedInUser.next(loggedIn);
  }

  getUpdate(): Observable<boolean> {
    console.log("getupadte");
    return this.loggedInUser.asObservable();
  }
}
