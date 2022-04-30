import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.css'],
})
export class AllSalesComponent implements OnInit {
  sales: any[] = [];
  errMsg: string = '';
  user: any;
  logged: boolean = false;
  isError: boolean = false;
  dataSuccess: boolean = false;
  dataFailure: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';

  constructor(private salesService: SalesService) {}

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
      this.logged = true;
    }
    console.info(this.user);
    this.getSales();
  }

  getSales() {
    const uri = '/sales';
    this.salesService.getSales(uri).subscribe({
      next: (result: any) => {
        console.log(result);
        this.sales = result;
      },
      error: (err) => {
        console.log(err);
        this.errMsg = err;
        this.isError = true;
      },
      complete: () => console.info('Completed'),
    });
  }

  deleteSale(id: string) {
    const uri = `/sales/${id}`;
    this.salesService.removeSale(uri).subscribe({
      next: (result: any) => {
        console.log(result);
        this.dataSuccess = true;
        this.successMsg = 'Sale Deleted';
      },
      error: (err) => {
        console.log(err);
        this.errMsg = err;
        this.isError = true;
        this.dataFailure = true;
        this.errorMsg = err.error;
      },
      complete: () => {
        console.info('Completed');
        this.getSales();
      },
    });
  }
}
