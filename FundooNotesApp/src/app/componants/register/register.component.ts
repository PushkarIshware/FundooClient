import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserServices/user.service';
import { RegisterModel } from 'src/app/model/Register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
@Injectable()
export class RegisterComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private service: UserService, private router: Router, private formBuilder: FormBuilder) { }
  user: RegisterModel = new RegisterModel();

  registerForm = this.formBuilder.group({
    username: [this.user.username, [Validators.required]],
    email: [this.user.email, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._]+@[a-zA-Z]+.[a-zA-Z]+$')]],
    password1: [this.user.password1, [Validators.required, Validators.minLength(8)]],
    password2: [this.user.password2, [Validators.required, Validators.minLength(8)]],
  });
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$')]);
  password1 = new FormControl('', [Validators.required, Validators.minLength(8)]);
  password2 = new FormControl('', [Validators.required, Validators.minLength(8)]);

  ngOnInit() {
  }
  onSubmit() {
    this.service.register(this.registerForm.value).subscribe(
      (response) => {
        localStorage.setItem('token', response['token']);
        this.router.navigate(['/']);
        this.Activate_account();
      },
      (error) => {
        this.failed_message();
      });
  }
  getErrorMessageUsername() {
    return this.username.hasError('required') ? 'Username Required.' : '';
  }
  getErrorMessageEmail() {
    // tslint:disable-next-line:max-line-length
    return this.email.hasError('required') ? 'Please Enter Correct Email' : this.email.hasError('email') ? 'Please Enter Correct Email' : '';
  }
  getErrorMessagePassword() {
    return this.password1.hasError('required') ? 'password should be at least 8 characters' : '';
  }
  getErrorMessageCPassword() {
    return this.password2.hasError('required') ? 'password should be at least 8 characters' : '';
  }


  // popup messages
  Activate_account() {
    this.snackBar.open('Account activation link has been sent to your email...\nPlease Activate Your Account...', 'OK', {
      duration: 5000
    });
  }

  failed_message() {
    this.snackBar.open('Something bad happened.', 'OK',
      { duration: 3000 });
  }

}
