import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';
import { CommonServiceService } from 'src/app/services/common-service.service';
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

  constructor(
    private salesService: SalesService,
    private commonService: CommonServiceService
  ) {
    this.commonService.loggedUser.subscribe((loggedUser) => {
      this.logged = loggedUser;
      console.log('sales logged', this.logged);
    });
    console.log('sales logged', this.logged);
  }

  ngOnInit(): void {
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
