import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  userRegistrationForm = this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  saveBtn: boolean = this.userRegistrationForm.valid;
  user: any;
  dataSuccess: boolean = false;
  dataFailure: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';
  constructor(
    private fb: FormBuilder,
    private usersService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onBlur(): void {
    console.log('blur event');
    this.saveBtn = this.userRegistrationForm.valid;
  }

  onSave() {
    console.warn(this.userRegistrationForm.value);
    const userData = { ...this.userRegistrationForm.value };
    // this.userRegistrationForm.setValue({});
    console.log(userData);
    const uri = '/register';

    this.usersService.getUsers(userData, uri).subscribe(
      (result) => {
        {
          console.log(result);
          this.user = result;
          this.dataSuccess = true;
          this.successMsg = 'User Registered.';
          setTimeout(() => {
            this.redirect();
          }, 3000);
        }
      },
      (err) => {
        console.log(err);
        this.dataFailure = true;
        this.errorMsg = err.error;
      }
    );
    this.clearForm();
  }

  clearForm() {
    this.userRegistrationForm.reset('');
    this.onBlur();
  }

  redirect() {
    this.router.navigate(['/home']);
  }
}
