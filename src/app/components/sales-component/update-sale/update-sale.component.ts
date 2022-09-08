import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SalesService } from 'src/app/services/sales.service';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-sale',
  templateUrl: './update-sale.component.html',
  styleUrls: ['./update-sale.component.css'],
})
export class UpdateSaleComponent implements OnInit, OnDestroy {
  saleSubscription!: Subscription;
  updateSaleForm = this.fb.group({
    name: [null, Validators.required],
    quantity: [0, Validators.required],
    price: [0, Validators.required],
  });

  saveBtn: boolean = this.updateSaleForm.valid;
  saleId: any = '';
  errMsg: string = '';
  isError: boolean = false;
  dataSuccess: boolean = false;
  dataFailure: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private salesService: SalesService
  ) {}
  ngOnDestroy(): void {
    this.saleSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.saleSubscription = this.route.params.subscribe((params: Params) => {
      this.saleId = params['id'];
      this.getSale(this.saleId);
    });
  }

  onBlur(): void {
    console.log('blur event');
    this.saveBtn = this.updateSaleForm.valid;
  }

  onSave() {
    const data = this.updateSaleForm.value;
    console.log(data);
    const uri = `/sales/${this.saleId}`;
    this.salesService.updateSale(data, uri).subscribe({
      next: (result: any) => {
        console.log(result);
        this.dataSuccess = true;
        this.successMsg = 'Sale updated.';
        this.updateSaleForm.controls['name'].patchValue(result.name);
        this.updateSaleForm.controls['quantity'].patchValue(result.quantity);
        this.updateSaleForm.controls['price'].patchValue(result.price);
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
        setTimeout(() => {
          this.redirect();
        }, 3000);
      },
    });

    this.clearForm();
  }
  getSale(id: string) {
    const uri = `/sales/${id}`;
    this.salesService.getSales(uri).subscribe({
      next: (result: any) => {
        console.log(result);
        // let sName: string,
        //   sQty: number,
        //   sPrice: number = 0;
        // sName = result.name;
        // sQty = result.quantity;
        // sPrice - result.price;
        // console.log(result.name, result.quantity, result.price);
        this.updateSaleForm.controls['name'].patchValue(result.name);
        this.updateSaleForm.controls['quantity'].patchValue(result.quantity);
        this.updateSaleForm.controls['price'].patchValue(result.price);
      },
      error: (err) => {
        console.log(err);
        this.errMsg = err;
        this.isError = true;
      },
      complete: () => {
        console.info('Completed');
      },
    });
  }

  //Valide input fields
  validateInput(type: number, event: any) {
    const qty = event.target.value;
    if (type === 1 && qty < 0) {
      window.alert('Quantity cannot be negative');
      this.updateSaleForm.controls['quantity'].patchValue(null);
    } else if (type === 2 && qty < 0) {
      window.alert('Quantity cannot be negative');
      this.updateSaleForm.controls['price'].patchValue(null);
    }
  }

  clearForm() {
    this.updateSaleForm.reset('');
    this.onBlur();
  }

  redirect() {
    this.router.navigate(['/sales']);
  }
}
