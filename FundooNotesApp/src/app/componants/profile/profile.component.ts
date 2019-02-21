import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/UserServices/user.service';
import { ProfileModel } from 'src/app/model/Profile.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: ProfileModel = new ProfileModel();
  constructor(private service: UserService, private snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder) { }
   profileForm = this.formBuilder.group({
    username : new FormControl (this.user.username),
    photo : new FormControl (this.user.photo)
  });



  ngOnInit() {
  }
  onSubmit() {
    console.log(this.profileForm.value);
    this.service.profile(this.profileForm.value).subscribe(
      (response) => {console.log('succsess', response);
                    localStorage.setItem('token', response['token']);
                     // this.router.navigate(['/']);
                    },
      (error) => {console.log('error', error);
      });
  }
}
