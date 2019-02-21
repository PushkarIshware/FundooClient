import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginModel } from 'src/app/model/Login.model';
import { UserService } from 'src/app/services/UserServices/user.service';
// import { UserServiceService } from 'src/app/services/userServices/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
@Injectable()
export class LoginComponent implements OnInit {
  user: LoginModel = new LoginModel();
  // tslint:disable-next-line:max-line-length
  constructor(private service: UserService, private snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder) {

   }
    loginForm = this.formBuilder.group({
    username: [this.user.username],
    password: [this.user.password],
  });

  ngOnInit() {

  }
  // tslint:disable-next-line:member-ordering
  openSnackBar() {
    this.snackBar.open('you are logged in...', 'OK', {
      duration: 3000
    });
  }

  openSnackBarError() {
    this.snackBar.open('invalid email or password!!!!!', 'OK', {
      duration: 3000
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('success', response);
        if (response['success']) {
      localStorage.setItem('token', response['data']);
      this.openSnackBar();
      this.router.navigate(['/dashboard']);
        }
        // tslint:disable-next-line:no-unused-expression
        (error) => {
          console.log('error', error);
      this.openSnackBarError();
      this.router.navigate(['/dashboard']);
    };
  }
  //   console.log(this.loginForm.value);

  //   this.service.login(this.loginForm.value).subscribe(
  //     (response) => {

  //       console.log( response);
  //       this.openSnackBar();
  //       if (response['success']) {
  //       this.router.navigate(['/dashboard']);
  //                    } else {
  //   console.log('error', response);
  //   this.router.navigate(['/register']);
  //   this.openSnackBarError();
  // }
  //                   },
      );

  }
}
