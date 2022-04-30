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
  @Input() logged: boolean = false;
  private loggedInUser: Subscription = new Subscription;

  constructor(
    private router: Router,
    private comonService: CommonServiceService
  ) {
    console.log("before logged", this.logged);
    this.loggedInUser = this.comonService.getUpdate().subscribe(
      value => {
        this.logged = value;
      }
    );
    console.log("after logged", this.logged);
  }

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
  

  logout() {
    console.log(this.user);
    localStorage.removeItem('loggedUser');
    this.logged = false;

    this.router.navigate(['/home']);
  }
}
