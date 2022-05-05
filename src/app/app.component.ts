import { Component } from '@angular/core';
import { CommonServiceService } from './services/common-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ontoborn-sales';
  loggedIn: boolean = false;

  constructor(private commonService: CommonServiceService) {
    this.commonService.checklogIn(this.loggedIn);
  }
}
