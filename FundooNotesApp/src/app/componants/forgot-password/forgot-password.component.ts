import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
// import { LoginModel } from 'src/app/models/login.model';
import { environment } from 'src/environments/environment';
import { ForgotPasswordModel } from 'src/app/model/ForgotPassword.model';
import { UserService } from 'src/app/services/UserServices/user.service';
// import { UserServiceService } from 'src/app/services/userServices/user-service.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
@Injectable()
export class ForgotPasswordComponent implements OnInit {
  user: ForgotPasswordModel = new ForgotPasswordModel();
  constructor(private service: UserService, private snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder) { }

  ForgotPasswordForm = this.formBuilder.group({
    email: [
      // this.user.email
      'pushkar.ishware@gmail.com'
    ],
  });
  ngOnInit() {
  }
  onSubmit() {
    console.log(this.ForgotPasswordForm.value);
    this.service.forgotPassword(this.ForgotPasswordForm.value).subscribe(
      (response) => {console.log('succsess', response);
                     console.log('go to your mail');
                    },
      (error) => {console.log('error', error);
      }
      );
  }
}
