import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-single-sale',
  templateUrl: './single-sale.component.html',
  styleUrls: ['./single-sale.component.css'],
})
export class SingleSaleComponent implements OnInit {
  sale: any = [];
  saleId: any = '';
  errMsg: string = '';
  isError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salesService: SalesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id', id);
    this.saleId = id;
    this.getSale(this.saleId);
  }

  getSale(id: string) {
    const uri = `/sales/${id}`;
    this.salesService.getSales(uri).subscribe({
      next: (result) => {
        this.sale.push(result);
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
}
