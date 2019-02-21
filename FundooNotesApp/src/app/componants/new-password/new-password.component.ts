import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserServices/user.service';
import { NewPasswordModel } from 'src/app/model/NewPassword.model';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  user: NewPasswordModel = new NewPasswordModel();
  constructor(private service: UserService, private snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder) { }
  newpasswordForm = this.formBuilder.group({
    newpassword1: [this.user.newpassword1],
    newpassword2: [this.user.newpassword2],
  });
  ngOnInit() {
  }
  onSubmit() {
    console.log(this.newpasswordForm.value);
  }
}
