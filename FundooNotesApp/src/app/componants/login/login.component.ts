import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginModel } from 'src/app/model/Login.model';
import { UserService } from 'src/app/services/UserServices/user.service';
// import { UserServiceService } from 'src/app/services/userServices/user-service.service';


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


    // (window as any).fbAsyncInit = function() {
    //   FB.init({
    //     appId      : '2375513825801070',
    //     cookie     : true,
    //     xfbml      : true,
    //     version    : 'v3.1'
    //   });
    //   FB.AppEvents.logPageView();
    // };

    // (function(d, s, id) {
    //    // tslint:disable-next-line:prefer-const
    //    let js, fjs = d.getElementsByTagName(s)[0];
    //    if (d.getElementById(id)) {return;
    //   }
    //    js = d.createElement(s); js.id = id;
    //    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    //    fjs.parentNode.insertBefore(js, fjs);
    //  }(document, 'script', 'facebook-jssdk'));

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
// running code
  onSubmit() {
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('success', response);
        this.res = response;
  //      if (response['success']) {
          if (this.res['success']) {
      console.log('tokeeeeeeeen' , response['data']);
      // localStorage.setItem('token', response['data']);
      // this.id = response['data'];
      // localStorage.setItem('token', response['message']);

      // console.log('token set successfully', this.id);
      localStorage.setItem('token', response['data']['token']);
      this.openSnackBar();
      this.router.navigate(['/dashboard']);
        } else {
            console.log('wrong');
              this.openSnackBarError();
        }
        // tslint:disable-next-line:no-unused-expression
        (error) => {
          console.log('error', error);
      this.openSnackBarError();
      this.router.navigate(['/dashboard']);
    };
  }
      );

  }
// finish




  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // } else if (socialPlatform === 'google') {
    //   socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    // } else if (socialPlatform === 'linkedin') {
    //   socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ' , userData);
        // Now sign-in with userData
       // ...
      }
    );
  }

  FBlogin() {
    console.log('fb login called');
    // let socialPlatformProvider;
    // socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // this.socialAuthService.signIn(socialPlatformProvider).then(
    //   (userData) => {
    //     console.log(' sign in data : ' , userData);
    //     // Now sign-in with userData
    //     // ...
    //   }
    // );
  //   FB.login((response) => {
  //             console.log('submitLogin', response);
  //             if (response.authResponse) {
  //               // login success
  //               // login success code here
  //               // redirect to home page
  //               console.log('uid------', response.authResponse.userID);
  //               this.me(response.authResponse.userID, response.authResponse.accessToken);
  //               // console.log('uid------', response.authResponse.);

  //              } else {
  //              console.log('User login failed');
  //            }
  // });
  }

//   me(userId, accessToken) {
//     FB.api(
//         // tslint:disable-next-line:max-line-length
//         '/' + userId + '?fields=id,name,first_name,picture.width(150).height(150),age_range,friends,email',
//         (result) => {
//           console.log('result===', accessToken);
//             console.log('result===', result);
//             console.log('result===', result['first_name']);
//             console.log('result===', result['id']);
//             console.log('result===', result['picture']['data']['url']);
//             // if (result && !result.error) {
//             // }
// });
//   }

  gitLOG() {
    console.log('git called');
    this.http.get('http://localhost:8000/oauth/login/github/').subscribe(
          (response) => {console.log('success', response);
        // this.DataCollaborator_show = response['uname'];
        // console.log(this.DataCollaborator_show, 'this is from backend');
        },
          (error) => {console.log('error', error);
        });
  }
}
