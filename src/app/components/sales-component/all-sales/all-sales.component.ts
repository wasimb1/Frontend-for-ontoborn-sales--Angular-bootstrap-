import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModule } from 'src/app/modules/user/user.module';
import { SalesModule } from 'src/app/modules/sale/sales.module';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.css'],
})
export class AllSalesComponent implements OnInit {
  sales: SalesModule[] = [];
  errMsg: string = '';
  user!: UserModule;
  logged: boolean = false;
  isError: boolean = false;
  dataSuccess: boolean = false;
  dataFailure: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';

  constructor(
    private salesService: SalesService,
    private userService: UserService,
    private commonService: CommonServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.commonService.loggedUser.subscribe((loggedUser) => {
      this.logged = loggedUser;
      console.log('sales logged', this.logged);
    });
    console.log('sales logged', this.logged);
    this.commonService.loggedInUser.subscribe((loggedInUser) => {
      this.user = loggedInUser;
      console.log('LoggedIn User', loggedInUser);
    });
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

  viewSale(saleId: string) {
    console.log('sales logged', this.logged);
    this.userService.getLoggedIUser('/me').subscribe({
      next: (user: any) => {
        console.log(user);
        this.commonService.checkLoggedInUser(user);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => console.log('complete'),
    });
    // this.router.navigate([saleId], { relativeTo: this.route });
  }

  onEdit(id: string) {
    this.router.navigate(
      ['sales', id, 'update'],
      // { relativeTo: this.route },
      { queryParams: { allowUpadte: '1', fragment: 'update' } }
    );
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
