import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SalesService } from 'src/app/services/sales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.css'],
})
export class CreateSaleComponent implements OnInit {
  newSaleForm = this.fb.group({
    name: [null, Validators.required],
    quantity: [null, Validators.required],
    price: [null, Validators.required],
  });

  saveBtn: boolean = this.newSaleForm.valid;
  errMsg: string = '';
  isError: boolean = false;
  dataSuccess: boolean = false;
  dataFailure: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private salesService: SalesService
  ) {}

  ngOnInit(): void {}

  onBlur(): void {
    console.log('blur event');
    this.saveBtn = this.newSaleForm.valid;
  }

  onSave() {
    console.log('userRegistrationForm valid:', this.newSaleForm.valid);

    const data = this.newSaleForm.value;
    console.log(data);
    const uri = `/sales`;
    this.salesService.saveNewSale(data, uri).subscribe({
      next: (result: any) => {
        console.log(result);
        this.dataSuccess = true;
        this.successMsg = 'Sale created.';
        this.newSaleForm.controls['name'].patchValue(result.name);
        this.newSaleForm.controls['quantity'].patchValue(result.quantity);
        this.newSaleForm.controls['price'].patchValue(result.price);
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

  validateInput(type: number, event: any) {
    const qty = event.target.value;
    if (type === 1 && qty < 0) {
      window.alert('Quantity cannot be negative');
      this.newSaleForm.controls['quantity'].patchValue(null);
    } else if (type === 2 && qty < 0) {
      window.alert('Quantity cannot be negative');
      this.newSaleForm.controls['price'].patchValue(null);
    }
  }

  clearForm() {
    this.newSaleForm.reset('');
    this.onBlur();
  }

  redirect() {
    this.router.navigate(['/sales']);
  }
}
