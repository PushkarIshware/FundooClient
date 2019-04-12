import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginModel } from 'src/app/model/Login.model';
import { UserService } from 'src/app/services/UserServices/user.service';


import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
@Injectable()
export class LoginComponent implements OnInit {
  user: LoginModel = new LoginModel();
  // tslint:disable-next-line:max-line-length
  id: any;
  res: any;
  constructor(private http: HttpClient, private socialAuthService: AuthService,
    private service: UserService, private snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder) {

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
    this.service.login(this.loginForm.value).subscribe(
      (response) => {
        this.res = response;
        if (this.res['success']) {
          localStorage.setItem('token', response['data']['token']);
          this.openSnackBar();
          this.router.navigate(['/dashboard']);
        } else {
          this.openSnackBarError();
        }
        // tslint:disable-next-line:no-unused-expression
        (error) => {
          this.openSnackBarError();
          this.router.navigate(['/dashboard']);
        };
      }
    );

  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
      }
    );
  }

  FBlogin() {

  }


  gitLOG() {
    this.http.get('http://localhost:8000/oauth/login/github/').subscribe(
      (response) => {
      },
      (error) => {
      });
  }
}
