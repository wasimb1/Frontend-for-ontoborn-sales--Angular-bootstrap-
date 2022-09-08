import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SalesModule } from 'src/app/modules/sale/sales.module';
@Component({
  selector: 'app-single-sale',
  templateUrl: './single-sale.component.html',
  styleUrls: ['./single-sale.component.css'],
})
export class SingleSaleComponent implements OnInit, OnDestroy {
  saleSubscription!: Subscription;
  sale: SalesModule = new SalesModule();
  saleId: any = '';
  errMsg: string = '';
  isError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salesService: SalesService
  ) {}

  ngOnInit(): void {
    this.saleSubscription = this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.saleId = params['id'];
      this.getSale(this.saleId);
    });
  }

  getSale(id: string) {
    const uri = `/sales/${id}`;
    this.salesService.getSales(uri).subscribe({
      next: (result: any) => {
        this.sale = { ...result };
        console.log(this.sale);
      },
      error: (err) => {
        console.log(err);
        this.errMsg = err;
        this.isError = true;
      },
      complete: () => console.info('Completed'),
    });
  }

  onEdit() {
    this.router.navigate(['update'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.saleSubscription.unsubscribe();
  }
}
