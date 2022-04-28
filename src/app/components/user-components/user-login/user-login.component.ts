import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/services/common-service.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  userLoginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  loginBtn: boolean = this.userLoginForm.valid;
  user: any;
  dataSuccess: boolean = false;
  dataFailure: boolean = false;
  loggedIn: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';
  constructor(
    private fb: FormBuilder,
    private usersService: UserService,
    private router: Router,
    comonService: CommonServiceService
  ) {
    this.loggedIn = comonService.isLogged;
  }

  ngOnInit(): void {}

  onBlur(): void {
    this.loginBtn = this.userLoginForm.valid;
  }

  onSave() {
    console.warn(this.userLoginForm.value);
    const userData = { ...this.userLoginForm.value };

    console.log(userData);
    const uri = '/login';

    this.usersService.getUsers(userData, uri).subscribe(
      (result: any) => {
        {
          console.log(result);
          this.user = result;
          this.dataSuccess = true;
          localStorage.setItem('loggedUser', JSON.stringify(this.user));

          this.successMsg = 'User Registered.';

          setTimeout(() => {
            this.redirect();
          }, 3000);
        }
      },
      (err) => {
        this.dataFailure = true;
        console.log('dataFailure', this.dataFailure);
        this.errorMsg = err.error;

        console.log(err.error);
        alert(this.errorMsg);
      }
    );
    this.clearForm();
  }

  clearForm() {
    this.userLoginForm.reset('');
    this.onBlur();
  }

  redirect() {
    this.router.navigate(['/sales']);
  }
}
